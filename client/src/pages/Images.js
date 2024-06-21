import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './slider.css'; // Ensure this path is correct

const Images = () => {
  const images = [
    '/item9.jpg',
    '/item2.jpg',
    '/item8.jpg',
    '/item7.jpg',
    '/item5.jpg'
  ];
  
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      {/* Background Images */}
      <div className="absolute inset-0 flex overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Item ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
              selectedImage === image ? 'opacity-100' : 'opacity-20'
            }`}
          />
        ))}
      </div>

      {/* Selected Image */}
      <div className="relative z-10 flex flex-col items-center">
        <img src={selectedImage} alt="Selected" className="w-1/3 border-4 border-white rounded" />
        <div className="flex space-x-2 mt-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`p-1 border-2 rounded ${selectedImage === image ? 'border-blue-500' : 'border-transparent'}`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} className="w-16 h-16 object-cover" />
            </button>
          ))}
        </div>
        <Link to="/orders">
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Order Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Images;
