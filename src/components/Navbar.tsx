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
    }

    return (
        <div className="mx-2 my-1">
            <nav className="bg-white bg-opacity-80 border-gray-200 dark:bg-gray-900 relative z-50">
                <div className="max-w-screen-xl flex items-center justify-between ">
                    <a href='/' className="flex items-center cursor">
                        <div className="bg-themeYellowOrange border text-white font-bold py-1 pl-3 m-0 rounded-l-md">
                            WP
                        </div>
                        <div className="text-themeYellowOrange font-bold py-1 pr-3 border m-0  border-themeYellowOrange rounded-r-md">
                            EXPOSE
                        </div>
                    </a>
                    {/* Navigation Menu for Large and Medium Screens */}
                    <div className="hidden md:flex items-center justify-between w-full md:w-auto">
                        <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 font-medium p-4 md:p-0 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li><a href="#" className="block py-2 px-3 text-gray-900 rounded bg-gray-100 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-current="page">Detect Wordpress</a></li>
                            <li><a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> Blog </a></li>
                            <li><a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> Contact</a></li>
                        </ul>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-50 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} onClick={() => setisMenuOpen(false)}>
                        <div className={`absolute top-0 right-0 w-64 bg-white dark:bg-gray-800 p-4 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-user">
                            <ul className="space-y-4">
                                <li><a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">الرئيسية</a></li>
                                <li><a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">عن الشركة</a></li>
                                <li><a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">الخدمات</a></li>
                                <li><a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">التسعير</a></li>
                                <li><a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">تواصل معنا</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;
