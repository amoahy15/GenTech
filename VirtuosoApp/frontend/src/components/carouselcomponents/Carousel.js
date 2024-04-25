import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageCardHover from './ImageCardHover';
import axios from 'axios';
import { useHistory } from 'react-router-dom';  

const Carousel = ({ category }) => {
  // Define the function before you use it in any hooks
  const getSliderSettings = (width) => {
    if (width < 480) {
      return {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    } else if (width < 1024) {
      return {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        
      };
    } else {
      return {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
      };
    }
  };

  const [artworks, setArtworks] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [settings, setSliderSettings] = useState(getSliderSettings(window.innerWidth));
  const history = useHistory();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setSliderSettings(getSliderSettings(windowWidth));
  }, [windowWidth]);

  useEffect(() => {
    const fetchArtworks = async () => {
      if (category) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/artwork/tags/${category}`);
          setArtworks(response.data.artworks || []);
        } catch (error) {
          console.error(`Error fetching artworks with tag ${category}:`, error);
        }
      }
    };

    fetchArtworks();
  }, [category]);



  const handleImageClick = async (artworkID) => {

    history.push(`/reviews/${artworkID}`);
    window.location.reload();
    
  };

  return (
    <Slider {...settings} key={JSON.stringify(settings)} styles={{margin: 'auto'}}>
    {artworks.map((artwork, index) => (
        <div key={index} onClick={() => handleImageClick(artwork.artwork_id)}
        styles={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto'}}>
            <ImageCardHover src={artwork.image_url} alt={artwork.title} />
        </div>
    ))}
    </Slider>
  );
};

export default Carousel;