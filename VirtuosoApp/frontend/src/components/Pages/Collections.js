import React, { useEffect, useState } from 'react';
import Carousel from '../carouselcomponents/Carousel';
import styles from '../styles/carousel.module.css';


const Collections = ({category}) => {
    return (
        <div className={styles.containerColl} styles={{margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>  
            <Carousel category= {category} />
        </div>
    );
};

export default Collections;