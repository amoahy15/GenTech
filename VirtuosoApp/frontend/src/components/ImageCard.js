import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './styles/carousel.module.css';

const ImageCard = ({ src, alt }) => {
  return (
    <div className={styles['image-card']}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default ImageCard;