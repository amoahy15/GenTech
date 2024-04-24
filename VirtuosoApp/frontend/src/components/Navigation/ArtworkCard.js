import React from "react";
import styles from "../styles/artcard.modules.css"
const ArtworkCard = ({ artwork }) => {
    return (
      <div className={styles.artworkCard}>
        <img src={artwork.imageUrl} alt={artwork.name} style={{ width: '100px', height: '100px' }} />
        <div>{artwork.name}</div>
      </div>
    );
  };
  export default ArtworkCard;