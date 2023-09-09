import React, { useState } from 'react';

export const OptionPage:React.FC = () => {
    const [title, setTitle] = useState('This is an option page :)') 
    return (
        <>
            <div>
                <h1>{title}</h1>
            </div>
        </>
    )
}