import React, { useEffect, useState } from 'react';
import Carousel from '../carouselcomponents/Carousel';
import styles from '../styles/carousel.module.css';



const Collections = () => {
    return (
        <div className={styles.containerColl}>
            <h2 className={styles.h2}>Image Collections</h2>
            <Carousel category="trending" />
        </div>
    );
};

export default Collections;