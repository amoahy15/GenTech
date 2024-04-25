import React, { useState} from 'react';
import { useHistory } from "react-router-dom";
import styles from "../styles/carousel.module.css";

const ArtworkCard = ({ artwork }) => {
    const history = useHistory();
    const [isHovering, setIsHovering] = useState(false); 

    const handleMouseEnter = () => {
        setIsHovering(true);
        console.log("hovering")
    }

    const handleMouseLeave = () => {
        setIsHovering(false);
    }

    const handleClick = () => {
        history.push(`/reviews/${artwork.id}`);
        window.location.reload();
    };

    return (
      <div className={styles['image-card-container']}>
            <div
                className={styles['image-card']}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={artwork.imageurl} />
                {isHovering && (
                    <div className={styles.hoverContent}>
                        <p>{artwork.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtworkCard;
