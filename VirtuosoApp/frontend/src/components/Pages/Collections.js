import React, { useEffect, useState } from 'react';
import Carousel from '../carouselcomponents/Carousel';
import styles from '../styles/carousel.module.css';
import Row from "../Navigation/rowScroll";



const Collections = ({category}) => {
    return (
        <div className={styles.containerColl}>  
            <Carousel category= {category} />
        </div>
    );
};

export default Collections;