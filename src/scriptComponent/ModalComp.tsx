import React, { useState } from 'react';
import { SearchComp } from './SearchComp';
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons';
import { Modal, Button, Divider, Space, Tag } from 'antd';
import { downloadCSV, copyKeywordsToClipboard } from '../utils';
import './modal.module.css'
import { EtsyService } from '../api/etsy';
import { GoogleService } from '../api/google';
import {openWindow}  from '../utils/helperFunctions';

type ModalProps = {
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void;
    domain: string;
}

const styleTagSearchResult = { cursor: 'pointer', width: '100%', marginBottom: '10px' }

export const ModalComponet: React.FC<ModalProps> = ({ isModalOpen, setIsModalOpen,domain }) => {
    console.log('domain',domain)
    const [keywords, setKeywords] = useState([])
    const [results, setResults] = useState({})
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetchResultCount = async (keyword: string) => {
        let count: number = 0
        if(domain === 'etsy'){
            count = await EtsyService.getKeywordResults(keyword)
        }else if(domain === 'google'){
             count = await GoogleService.getKeywordResults(keyword)
        }

        const newResults = { ...results }
        console.log(count);
        newResults[keyword] = count
        setResults(newResults)
    }

    return (
        <>
            <Modal
                centered={false}
                width={1000}
                style={{ height: '200px', position: 'fixed', top: 75, right: 340 }}

                open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Divider orientation="left">
                    Keyword Search Tool &nbsp;&nbsp;
                    {Boolean(keywords.length) &&
                        <>
                        <Button onClick={() => { downloadCSV(keywords, results) }} icon={<DownloadOutlined />}></Button> &nbsp;&nbsp;
                            <Button onClick={() => { copyKeywordsToClipboard(keywords) }} icon={<CopyOutlined />}></Button>
                        </>
                    }
                </Divider>
                {!Boolean(keywords.length) &&
                    <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        You\'ve searched nothing yet!
                    </div>
                }
                {/* <Space className='custom_space' size={[0, 8]} wrap style={{ width: '100%', overflowX: 'auto' }}>
                    <div className="tag-container">
                        {keywords.reduce((acc, keyword, index) => {
                            if (index % 5 === 0) acc.push([]);
                            acc[acc.length - 1].push(keyword);
                            return acc;
                        }, []).map((column, colIndex) => (
                            <div key={colIndex} className="tag-column">
                                {column.map((keyword, tagIndex) => (
                                    <div
                                        key={`${colIndex}-${tagIndex}`}
                                    >
                                        <Tag
                                            className="tag"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => { window.open(`https://www.etsy.com/in-en/search?q=${keyword}`) }}
                                            color="orange"
                                        >
                                            {keyword}

                                            {
                                                results[keyword] &&
                                                <p>Count: {results[keyword]}</p>
                                            }

                                        </Tag>
                                        {
                                            !results[keyword] &&
                                            <p onClick={() => { fetchResultCount(keyword) }}>See more</p>
                                        }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </Space> */}


                <Space className='custom_space' style={{ width: '100%', overflowY: 'auto', maxHeight: '400px' }}> {/* Adjust max-height as needed */}
                    <div className="tag-container">
                        {keywords.reduce((acc, keyword, index) => {
                            if (index % Math.ceil(keywords.length / 4) === 0) acc.push([]);
                            acc[acc.length - 1].push(keyword);
                            return acc;
                        }, []).map((column, colIndex) => (
                            <div key={colIndex} className="tag-column">
                                {column.map((keyword, tagIndex) => (
                                    <div key={`${colIndex}-${tagIndex}`}>
                                        <Tag
                                            className="tag"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => { openWindow(domain,keyword)}}
                                            color="orange"
                                        >
                                            {keyword}
                                        </Tag>
                                        {
                                            results[keyword] &&
                                            <Tag
                                                color="green"
                                                style={styleTagSearchResult}
                                            >
                                                Results: {results[keyword]}
                                            </Tag>

                                        }
                                        {
                                            !results[keyword] &&
                                            <Tag
                                                color="blue"
                                                style={styleTagSearchResult}
                                                onClick={() => { fetchResultCount(keyword) }}>
                                                see results
                                            </Tag>
                                        }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </Space>

                <Divider orientation="left"></Divider>
                <SearchComp setKeywords={setKeywords} domain = {domain} />
            </Modal>
        </>
    );
};