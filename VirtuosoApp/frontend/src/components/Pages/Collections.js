import React, { useEffect, useState } from 'react';
import Carousel from '../carouselcomponents/Carousel';
import '../styles/profile.modules.css';

const Collections = () => {
    return (
        <div>
            <h2>Image Collections</h2>
            <Carousel category="trending" />
        </div>
    );
};

export default Collections;