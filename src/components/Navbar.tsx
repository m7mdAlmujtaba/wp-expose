"use client";

import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setisMenuOpen] = useState(false);
    const [isUserMenuOpen, setisUserMenuOpen] = useState(false);

    const handleToggle = () => {
        setisMenuOpen(!isMenuOpen);
    };

    const handleUserToggle = () => {
        setisUserMenuOpen(!isUserMenuOpen);
    };

    return (
        <div className="sm:mx-2 my-1">
            <nav className="sm:bg-white bg-opacity-80 border-gray-200 dark:bg-gray-900 relative z-50">
                <div className="max-w-screen-xl flex items-center justify-between ">
                    <a href="/" className="relative flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden border border-white-800 shadow-xl rounded p-[2px]">
                            <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#EAB308_120deg,transparent_20deg)]"></div>
                            <span className="self-center z-20 text-white text-sm font-extrabold whitespace-nowrap dark:text-white uppercase rounded p-2 shadow-xl bg-yellow-500">
                               WP-EXPOSE
                            </span>
                        </div>
                    </a>

                    {/* Toggle Icon for Mobile Menu */}
                    <button
                        onClick={handleToggle}
                        className="md:hidden text-white focus:outline-none"
                    >
                        {isMenuOpen ? (
                            // Close icon (X)
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Open icon (hamburger)
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>

                    {/* Navigation Menu for Large and Medium Screens */}
                    <div className="hidden md:flex items-center justify-between w-full md:w-auto">
                        <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 font-medium p-4 md:p-0 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded bg-gray-100 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-current="page">
                                    Detect Wordpress
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> Blog </a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-50 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} onClick={() => setisMenuOpen(false)}>
                        <div className={`absolute top-0 right-0 w-64 bg-white dark:bg-gray-800 p-4 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-user">
                            <ul className="space-y-4">
                                <li>
                                    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">الرئيسية</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">عن الشركة</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">الخدمات</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">التسعير</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">تواصل معنا</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
