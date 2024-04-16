import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageCardHover from './ImageCardHover';
import '../styles/carouselarrow.module.css';
import axios from 'axios';
import React, {useState, useEffect, settings} from 'react';
const fetchImagesFromCategory = async (category) => {
  try {
      const response = await axios.get(`http://127.0.0.1:8000/api/s3/images/${category}`);
      return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
      console.error(`Error fetching images for category ${category}:`, error);
      return [];
  }
};

const Carousel = ({ category }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (category && typeof category === 'string') {
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
    
    <Slider {...settings}>
        {images.map((image, index) => (
        <div key={index}>
          <a href = './reviews'><ImageCardHover src={image} alt={`Slide ${index + 1}`} /></a>
          
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
