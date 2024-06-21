import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/Authcontex'; // Assuming AuthContext is correctly defined

const Navbar = () => {
    
    const [showDropdown, setShowDropdown] = useState(false);
    const myItem = localStorage.getItem('myKey');

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('myKey');

        setShowDropdown(false); // Close dropdown after logout
    };

    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
    };

    return (
        <nav className="w-full h-48 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <img src="./logo1.png" alt="Logo" className="h-44" />
                </div>
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="text-2xl text-white hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/orders" className="text-2xl text-white hover:text-gray-300">
                        Orders
                    </Link>
                    <div className="relative">
                        <span
                            className="text-2xl text-white cursor-pointer hover:text-gray-300"
                            onClick={handleDropdownClick}
                        >
                            Account
                        </span>
                        {showDropdown && (
                            <div className="absolute top-full right-0 bg-gray-900 text-white mt-1 p-2 rounded">
                                {myItem ? (
                                    <button
                                        onClick={handleLogout}
                                        className="block px-4 py-2 hover:bg-gray-700 rounded"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <div className="mb-2">
                                            <Link
                                                to="/login"
                                                className="block px-4 py-2 hover:bg-gray-700 rounded"
                                                onClick={closeDropdown}
                                            >
                                                Login
                                            </Link>
                                        </div>
                                        <div>
                                            <Link
                                                to="/signup"
                                                className="block px-4 py-2 hover:bg-gray-700 rounded"
                                                onClick={closeDropdown}
                                            >
                                                Sign Up
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
