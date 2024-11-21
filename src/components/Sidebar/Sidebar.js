import React from 'react';
import {useState} from "react";
import astro from "./astro.png";
import fashion from "./fashion.png";
import fastFood from"./fast-food.png";
import lion from "./lion.png";
import nature from "./nature.png";
import office from "./office-building.png";
import portrait from "./portrait.png";
import sports from "./soccer-player.png";
import "./SideBar.css";
import {useNavigate} from "react-router-dom";


const buttons = [
    { alt: "Nature", tooltip: "Nature", src: nature },
    { alt: "Astro", tooltip: "Astro", src:astro },
    { alt: "Fashion", tooltip: "Fashion", src:fashion },
    { alt: "Food", tooltip: "Food", src:fastFood },
    { alt: "Animals", tooltip: "Animals", src:lion },
    { alt: "Office", tooltip: "Office", src:office },
    { alt: "Portraits", tooltip: "Portraits", src:portrait },
    { alt: "Sports", tooltip: "Sports", src:sports },
];




const Sidebar = () => {
    const [visible, setVisible] = useState(null);
    const navigate = useNavigate(); // Get the navigate function

    const handleNavigation = (e, query) => {
        navigate(`/?query=${query}`); // Change the route programmatically
        if (window.debounceTimer) clearTimeout(window.debounceTimer);
        window.debounceTimer = setTimeout(() => {
            setVisible(null);
            e.target.blur();
        }, 1000);
    };
    return (

        <div className="fixed top-56 z-10">
            {buttons.map((button, index) => (
                <div key={index}>
                    <button
                        onClick={(e)=>handleNavigation(e,button.tooltip)}
                        onMouseEnter={() => setVisible(index)}
                        onMouseLeave={() => setVisible(null)}
                        className="p-2 hover:bg-fuchsia-600 inline-block bg-purple-950 w-auto bg-opacity-80 transition-transform duration-200 hover:scale-125"
                    >
                        <img src={button.src} alt={button.alt} width="20px" height="20px" className="transition-transform duration-100 hover:scale-125" />
                    </button>
                    {visible === index && (
                        <div
                            className="inline-block ml-5 w-max px-2 py-1 bg-purple-950 bg-opacity-90 text-white font-thin text-sm shadow-lg fade-in">
                            {button.tooltip}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
