import React from 'react';
import ReactPlayer from 'react-player';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
    return (
        <div className="h-screen relative">
            <div className="absolute z-50 w-full">
                <Navbar />
            </div>

            <div className="relative h-full w-full">
                {/* Video Player */}
                <ReactPlayer
                    url="v1.mp4"
                    width="100%"
                    height="100%"
                    playing={true}
                    controls={false}
                    muted={true}
                    loop={true}
                    className="absolute top-0 left-0"
                />

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white py-4 text-center">
                    <h1 className="text-4xl font-bold">Celebrate life’s special moments with us.</h1>
                    <h1 className="text-4xl font-bold">Reserve your table today!</h1>
                </div>

                {/* See Menu Link */}
                <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-center">
                    <p className="text-xl text-white mb-2">Explore our exquisite menu and select your favorites!</p>
                    <Link 
                        to="/images" 
                        className="text-xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                    >
                        See Menu
                    </Link>
                    
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
