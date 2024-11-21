// src/components/Navbar.js
import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

const bgDark = "bg-purple-950";
const bgDark2 = "bg-purple-800";
const textDark = "text-white";
const textGrey = "text-gray-200";
const btnDark = "bg-purple-600";
const btnHover = "hover:bg-fuchsia-600";


const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [query, setQuery] = useState(null);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        handleNavigation(query);
    };

    const handleChange = (event) => {
        handleNavigation(event.target.value); // Update state with selected value
        setQuery(event.target.value);
    };

    const handleNavigation = (query) => {
        if (window.debounceTimer) clearTimeout(window.debounceTimer);
        window.debounceTimer = setTimeout(() => {
            if(!query) return;
            navigate(`/?query=${query}`); // Change the route programmatically
        }, 1000);
    };
    const onEnter = (e) => {
        if (e.key === "Enter") {
            e.target.blur();
        }
    };
    return (
        <>
            <nav className={`py-2 ${bgDark} ${textDark} w-full font-light fixed z-10`}>
                <div className="container mx-auto flex justify-between">
                    <div className=" text-2xl mx-1 font-thin cursor-pointer inline-flex" onClick={() => navigate("/")}>
                        <img src="/logo.png" alt="logo" className="w-7 h-7 ml-5" />
                        <span className="w-1/3 hidden sm:flex"><span className="tracking-widest ml-1">Wide</span><span className="tracking-tighter">Angle</span></span>
                    </div>

                    {/*search button*/}
                    <div className={`w-1/2`}>
                        <form className="w-full inline-flex justify-center">
                            <input onChange={handleChange}
                                   type="text"
                                   placeholder="Search..."
                                   onKeyDown={onEnter}
                                   className={`px-4 py-1 w-5/6 justify-self-center focus:outline-none ${bgDark2} ${textGrey}`}
                            />
                            <button onClick={handleSubmit}
                                    className={`${btnDark} text-white px-4 py-1 ${btnHover} `}>
                                <i className="fa fa-search "></i>
                            </button>
                        </form>
                    </div>

                    <div className={`hidden md:flex items-center tracking-widest`}>
                        <Link to="/" className={`px-2 py-1 ${btnHover}`}>Home</Link>
                        <Link to="/about-us" className={`px-2 py-1 ${btnHover}`}>About Us</Link>

                    </div>
                    <button onClick={toggleMobileMenu} className="md:hidden focus:outline-none mx-3">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>

                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 space-y-2 mx-3 tracking-widest">
                        <Link to="/" className={`block px-2 py-1 ${btnHover}`}>Home</Link>
                        <Link to="/about-us" className={`block px-2 py-1 ${btnHover}`}>About Us</Link>
                    </div>
                )}
            </nav>


        </>
    );
};

export default Navbar;
