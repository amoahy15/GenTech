import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/carousel.module.css';

const ImageCard = ({ src, alt }) => {
    const [isHovering, setIsHovering] = useState(false); 

    const handleMouseEnter = () => {
        setIsHovering(true);
    }

    const handleMouseLeave = () => {
        setIsHovering(false);
    }
   
    return (
        <div className={styles['image-card-hoverable']}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>

            {isHovering ? (
                <div className={styles.hoverContent}>
                    <p>Artwork name</p>
                    <p>My rating: * * * * *</p>
                    <p>Review likes: 32</p>
                </div>
            ) : (
                <img src={src} alt={alt} />
            )}
        </div>
    );
};

export default ImageCard;
