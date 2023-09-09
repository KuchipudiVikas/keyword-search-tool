import { CaretUpOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { ModalComponet } from './ModalComp';
// import { DraggableComp } from './DraggableComp';
import { FloatButton } from 'antd'

type Menuprops = {
  type: string;
}

export const MenuComponent: React.FC<Menuprops> = ({type}) => {
  
  const [isOpened, setIsOpened] = useState(false)
   
  function toggleModal() {
    console.log('Testing working component')
    setIsOpened(!isOpened)
  }
  
  return (
    <>
      <div>

        <ModalComponet isModalOpen={isOpened} setIsModalOpen={setIsOpened} domain={type}/>
        <FloatButton
          style={{ backgroundColor: '#FFBB5C', position: 'fixed', top: 125, right: 10 }}
          onClick={toggleModal} icon={<SearchOutlined />} />
      </div>
    </>
  )
}