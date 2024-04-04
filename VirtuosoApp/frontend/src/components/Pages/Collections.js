import React, { useEffect, useState } from 'react';
import '../styles/profile.modules.css';
import Carousel from '../carouselcomponents/Carousel';
import axios from 'axios'; // Ensure axios is installed or use fetch API

function Collection() {
  const [collections, setCollections] = useState({
    impressionism: [],
    surrealism: [],
    artNouveau: [],
  });

  useEffect(() => {
    // Example fetching function for a collection
    const fetchCollection = async (collectionName) => {
      try {
        const response = await axios.get(`/api/artwork/collection/${collectionName}`);
        return response.data.images; // Assuming the endpoint returns an object with an images array
      } catch (error) {
        console.error('Failed to fetch collection:', collectionName, error);
        return [];
      }
    };

    // Fetch all collections
    const fetchAllCollections = async () => {
      const impressionism = await fetchCollection('impressionism');
      const surrealism = await fetchCollection('surrealism');
      const artNouveau = await fetchCollection('artNouveau');
      setCollections({ impressionism, surrealism, artNouveau });
    };

    fetchAllCollections();
  }, []);

  return (
    <div style={{ paddingTop: '15vh', paddingLeft: '5vw', paddingRight: '5vw', marginBottom: '20px' }}>
      <div style={{ paddingBottom: '50px', paddingTop: '20px' }}>
        <h2 style={{ paddingBottom: '20px' }}>IMPRESSIONISM</h2>
        <Carousel images={collections.impressionism}></Carousel>
      </div>
      <div style={{ paddingBottom: '50px' }}>
        <h2 style={{ paddingBottom: '20px' }}>SURREALISM</h2>
        <Carousel images={collections.surrealism}></Carousel>
      </div>
      <div style={{ paddingBottom: '50px' }}>
        <h2 style={{ paddingBottom: '20px' }}>ART NOVEAU</h2>
        <Carousel images={collections.artNouveau}></Carousel>
      </div>
    </div>
  );
}

export default Collection;
