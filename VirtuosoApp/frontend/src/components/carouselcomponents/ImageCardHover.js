import React from 'react';
import styles from '../styles/carousel.module.css';

const ImageCardHover = ({ image }) => {
    return (
        <div className={`${styles.card} ${styles.hover}`}>
            <img src={image.url} alt={image.alt} />
            {/* Additional hover state content here */}
        </div>
    );
};

export default ImageCardHover;