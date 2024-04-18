import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageCardHover from './ImageCardHover';
import axios from 'axios';
import { useHistory } from 'react-router-dom';  

const Carousel = ({ category }) => {
  const [artworks, setArtworks] = useState([]);
  const [settings, setSliderSettings] = useState({
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
  
  });
  const history = useHistory();

  useEffect(() => {
    const fetchArtworks = async () => {
      if (category) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/artwork/tags/${category}`);
          setArtworks(response.data.artworks || []);
          updateSettings(response.data.artworks.length);
        } catch (error) {
          console.error(`Error fetching artworks with tag ${category}:`, error);
        }
      }
    };

    fetchArtworks();
  }, [category]);

  const updateSettings = (artworkCount) => {
    if (artworkCount === 1) {
      setSliderSettings({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
      });
    } else if(artworkCount == 2){
        setSliderSettings({
          dots: false,
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: false,
        });
    }
    else {
      setSliderSettings({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      });
    }
  };

  const handleImageClick = (artworkID) => {
    history.push(`/reviews/${artworkID}`);
    window.location.reload();
  };

  return (
    <Slider {...settings} key={JSON.stringify(settings)}>
    {artworks.map((artwork, index) => (
        <div key={index} onClick={() => handleImageClick(artwork.artwork_id)}>
            <ImageCardHover src={artwork.image_url} alt={artwork.title} />
        </div>
    ))}
</Slider>
  );
};

export default Carousel;