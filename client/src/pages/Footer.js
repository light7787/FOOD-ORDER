// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-4">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-center gap-12">
                    {/* Contact Information */}
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                        <p className="mb-2">123 Main St, City Name</p>
                        <p className="mb-2">Email: info@example.com</p>
                        <p>Phone: +1 (123) 456-7890</p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                        <ul>
                            <li><Link to="/about" className="text-gray-300 hover:text-white transition duration-300">About Us</Link></li>
                            <li><Link to="/services" className="text-gray-300 hover:text-white transition duration-300">Services</Link></li>
                            <li><Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-800 text-center py-4">
                <p>&copy; 2024 Your Restaurant Name. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
