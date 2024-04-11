import React from 'react';
import styles from '../styles/carousel.module.css';;

const ImageCard = ({ image }) => {
    return (
        <div className={styles.imageCard}>
        <div className={styles.img}>
            <img src={image.url} alt={image.alt} />
        </div>
        </div>
    );
};

export default ImageCard;
