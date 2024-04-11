import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/carouselarrow.module.css';
import ImageCard from './ImageCard';
import ImageCardHover from './ImageCardHover';


const fetchImagesFromCategory = async (category) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/api/s3/images/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching images for category ${category}:`, error);
        return [];
    }
};

const Carousel = ({ category }) => {
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

  const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
  };

  return (
    <Slider {...sliderSettings}>
        {images.map((image, index) => (
            <div key={index}>
                <ImageCard image={image} />
            </div>
        ))}
    </Slider>
  );
};

export default Carousel;