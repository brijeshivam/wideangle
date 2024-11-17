// Sidebar.js
import React from 'react';
import {useState} from "react";


const buttons = [
    { label: "1", tooltip: "Tooltip for Button 1" },
    { label: "2", tooltip: "Tooltip for Button 2" },
    { label: "3", tooltip: "Tooltip for Button 3" },
];

const Sidebar = () => {
    const [visible, setVisible] = useState(null);
    return (

        <div className="fixed top-56 z-10">
            {buttons.map((button, index) => (
                <div key={index} className="">
                    <button
                        onMouseEnter={() => setVisible(index)}
                        onMouseLeave={() => setVisible(null)}
                        className="p-2 hover:bg-fuchsia-600 text-white font-thin inline-block bg-purple-950 w-10 bg-opacity-80"
                    >
                        {button.label}
                    </button>
                    {visible === index && (
                        <div
                            className="inline-block ml-5 w-max p-2 bg-purple-950 bg-opacity-90 text-white font-thin text-sm shadow-lg">
                            {button.tooltip}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
