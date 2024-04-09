import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../styles/carouselarrow.module.css';
import ImageCard from './ImageCard';
import ImageCardHover from './ImageCardHover';


const fetchImagesFromS3 = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/api/s3/images');
        return response.data; 
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
};

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
      fetchImagesFromS3().then(urls => setImages(urls.map(url => ({ url: url, alt: 'Image from S3' }))));
  }, []);

  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
  };

  return (
    <div className="carousel-container"> 
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index} className="carousel-slide">
                    <ImageCard image={image} />
                </div>
            ))}
        </Slider>
    </div>
);
};

export default Carousel;