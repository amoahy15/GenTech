import React, { useEffect, useState } from 'react';
import styles from '../styles/carousel.module.css';
import Row from "../Navigation/rowScroll";
import UserArtworks from '../API/UserArtworks';



const UserCollections = ({category}) => {
    return (
        <div className={styles.containerColl}>  
            <UserArtworks category = {category}/>
        </div>
    );
};

export default UserCollections;