import React, { useState } from 'react';

export const Popup:React.FC = () => {
    const [title, setTitle] = useState('Swagat kab karoge hamara') 
    return (
        <>
            <div>
                <h1>{title}</h1>
                <img src="assets/icon16.png" alt="" />
            </div>
        </>
    )
}