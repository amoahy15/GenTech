import React from 'react';
import styles from '../styles/carousel.module.css';;

const ImageCard = ({ image }) => {
    return (
        <div className={styles.img4}>
            <img src={image.url} alt={image.alt} />
        </div>
    );
};

export default ImageCard;
