// src/components/Navbar.js
import React, {useState} from 'react';
const bgDark = "bg-purple-950";
const bgDark2 = "bg-purple-800";
const textDark = "text-white";
const textGrey = "text-gray-200";
const btnDark = "bg-purple-600";
const btnHover = "hover:bg-fuchsia-600";
const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);



    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <>
            <nav className={`py-2 ${bgDark} ${textDark} w-full font-light fixed z-10`}>
                <div className="container mx-auto flex items-center justify-between">
                    <div className=" text-2xl font-light mx-1">
                        <img src="/logo.png" alt="logo" width="40px" className="inline-block"/>
                        <strong className="tracking-widest">Wide</strong>Angle
                    </div>
                    <div className={`hidden md:flex items-center tracking-widest`}>
                        <a href="/public" className={`px-2 py-1 ${btnHover}`}>Home</a>
                        <a href="/public" className={`px-2 py-1 ${btnHover}`}>About Us</a>
                        <a href="/public" className={`px-2 py-1 ${btnHover}`}>Contact Us</a>
                        {/*search button*/}
                        <div className={`flex items-center rounded-md my-1`}>

                            <input
                                type="text"
                                placeholder="Search..."
                                className={`px-4 py-1  focus:outline-none ${bgDark2} ${textGrey}`}
                            />
                            <button
                                className={`${btnDark} text-white px-4 py-1 ${btnHover}`}>
                                Search
                            </button>
                        </div>
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
                        <a href="/public" className={`block px-2 py-1 ${btnHover}`}>Home</a>
                        <a href="/public" className={`block px-2 py-1 ${btnHover}`}>About Us</a>
                        <a href="/public" className={`block px-2 py-1 ${btnHover}`}>Contact Us</a>

                        {/*search button*/}
                        <div className={`flex items-center rounded-md mt-2`}>

                            <input
                                type="text"
                                placeholder="Search..."
                                className={`px-4 py-2 w-full focus:outline-none ${bgDark2} ${textGrey}`}
                            />
                            <button
                                className={`${btnDark} ${textDark} px-4 py-2 cursor-pointer ${btnHover} `}>
                                Search
                            </button>
                        </div>
                    </div>
                )}
            </nav>


        </>
    );
};

export default Navbar;
