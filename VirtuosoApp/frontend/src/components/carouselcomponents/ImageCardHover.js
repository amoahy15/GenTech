import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/carousel.module.css';

const ImageCardHover = ({ src, alt }) => {
    const [isHovering, setIsHovering] = useState(false); 

    const handleMouseEnter = () => {
        setIsHovering(true);
    }

    const handleMouseLeave = () => {
        setIsHovering(false);
    }
   
    return (
        <div className={styles['image-card-container']}>
            <div
                className={styles['image-card']}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={src} alt={alt} />
                {isHovering && (
                    <div className={styles.hoverContent}>
                        <p>Artwork name</p>
                        <p>My rating: * * * * *</p>
                        <p>Review likes: 32</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageCardHover;
