import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCard from '../carouselcomponents/ImageCard';



const fetchImagesFromCategory = async (category) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/api/s3/images/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching images for category ${category}:`, error);
        return [];
    }
};

const UserArtworks = ({ category }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (category) {
        const fetchedImages = await fetchImagesFromCategory(category);
        setImages(fetchedImages.map(url => ({ url: url, alt: `${category} image` })));
      }
    };

    fetchImages();
  }, [category]);


  return (
    <div>
       <h1>My art</h1>
        {images.map((image, index) => (
            <div key={index}>
                <ImageCard image={image} />
            </div>
        ))}
    </div>
  );
};

export default UserArtworks;