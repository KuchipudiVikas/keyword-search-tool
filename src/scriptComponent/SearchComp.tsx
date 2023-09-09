import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { debounce } from 'lodash';
import { EtsyService } from '../api/etsy';
import { GoogleService } from '../api/google';

const StyledSearch = styled(Input.Search)`
    background-color: #f0f0f0;
    border-color: #FFBB5C!important;

    /* Target the button inside the Search component */
    .ant-btn-primary {
        background-color: #FFBB5C!important;
        border-color: #FFBB5C!important;
    }

    .ant-input {
        border-color: #FFBB5C!important;
    }

    .ant-input:focus {
        border-color: #FFBB5C!important;
        box-shadow: 0 0 0 2px rgba(255, 187, 92, 0.2)!important; /* Optional: if you want a shadow around the focused input */
    }
`;
// const { Search } = Input;

export const SearchComp: React.FC<{
    setKeywords: (keywords: Array<string>) => void, domain:string
}> = ({ setKeywords,domain }) => {

    const [query, setQuery] = useState('');
    const [domainName, setDomainName] = useState(domain);
    // This function will only be invoked once every 300 milliseconds
    // of not being called. You can adjust the time as per your requirements.
    const debouncedSearch = useCallback(
        debounce(async (query) => {
            // Replace this with your API call or any other function
            /**Main */
            if(domain == 'etsy'){
            const result = await EtsyService.getSuggestions(query.toLowerCase())
            const finalResult = await EtsyService.multiSearch(result);
            setKeywords(finalResult)
            }else if(domain == 'google'){
            const result = await GoogleService.getSuggestions(query.toLowerCase())
            const finalResult = await GoogleService.multiSearch(result);
            setKeywords(finalResult)
            }
            /**Testing */
            // const gamingItems = [
            //     "gaming",
            //     "gaming svg",
            //     "gaming pc",
            //     "gaming table",
            //     "gaming decor",
            //     "gaming mouse pad",
            //     "gaming chair",
            //     "gaming desk",
            //     "gaming shirt",
            //     "gaming poster",
            //     "gaming mousepad",
            //     "gaming svg",
            //     "gaming svg files",
            //     "gaming svg bundle",
            //     "gaming pc",
            //     "gaming pc prebuilt",
            //     "gaming pc cheap",
            //     "gaming pc build",
            //     "gaming pc accessories",
            //     "gaming pc case",
            //     "gaming pc desk",
            //     "gaming pc keyboards",
            //     "gaming pc decor",
            //     "gaming pc white",
            //     "gaming pc custom",
            //     "gaming table",
            //     "gaming table plans",
            //     "gaming table with tv",
            //     "gaming table topper",
            //     "gaming table dnd",
            //     "gaming table with cover",
            //     "gaming table digital plans",
            //     "gaming table design",
            //     "gaming tablecloth",
            //     "gaming table with screen",
            //     "gaming table for pc",
            //     "gaming decor",
            //     "gaming decor wall art",
            //     "gaming decor setup",
            //     "gaming decor kawaii",
            //     "gaming decor rug",
            //     "gaming decor for boys room",
            //     "gaming decorations",
            //     "gaming decor for wall",
            //     "gaming mouse pad",
            //     "gaming mouse pad xxl",
            //     "gaming mouse pad pastel",
            //     "gaming mouse pad xl",
            //     "gaming mouse pad large",
            //     "gaming mouse pad cute",
            //     "gaming mouse pad mountains",
            //     "gaming mouse pad anime",
            //     "gaming mouse pad pink",
            //     "gaming mouse pad mat",
            //     "gaming chair",
            //     "gaming chair cover",
            //     "gaming chair for adults",
            //     "gaming chair pillow",
            //     "gaming chair mat",
            //     "gaming chair cushion",
            //     "gaming chair cheap",
            //     "gaming chair accessories",
            //     "gaming chair rug",
            //     "gaming chair arm rest",
            //     "gaming chair with lumbar",
            //     "gaming desk",
            //     "gaming desk mat",
            //     "gaming desk accessories",
            //     "gaming desk decor",
            //     "gaming desk pad",
            //     "gaming desk setup",
            //     "gaming desktop",
            //     "gaming desk l shape",
            //     "gaming desk lamp",
            //     "gaming desk l",
            //     "gaming deskmat",
            //     "gaming shirt",
            //     "gaming shirt girl",
            //     "gaming shirts for kids",
            //     "gaming shirt women",
            //     "gaming poster",
            //     "gaming poster digital download",
            //     "gaming mousepad",
            //     "gaming mousepad xl",
            //     "gaming mousepad anime",
            //     "gaming mousepad mockup",
            //     "gaming mousepad cute",
            //     "gaming mousepad ship",
            //     "gaming mousepad xxl",
            //     "gaming mousepad berserk"
            // ];

            // setKeywords(gamingItems)

        }, 300),
        [] // This ensures the debounced function remains consistent between renders
    );

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        console.log('without debounce', newQuery);

        debouncedSearch(newQuery); // Call the debounced search function
    };
    return (
        <>

            <StyledSearch
                value={query} onChange={handleInputChange} placeholder="Search Keyword" loading={false} enterButton />
            <br />
        </>
    );
};