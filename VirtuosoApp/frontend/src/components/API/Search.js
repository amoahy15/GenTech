import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import styles from "../styles/searchlist.module.css";
import axios from 'axios';
import SearchList from '../Navigation/SearchList';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [input, setInput] = useState("");
  const [userNames, setUserNames] = useState([]);
  const [filteredUserNames, setFilteredUserNames] = useState([]);
  const nav = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found!");
      nav.push('/login');
      return;
    }
  
    const fetchUsers = axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/list_users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  
    const fetchArtworks = axios.get(`http://127.0.0.1:8000/api/artwork/getartwork`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  
    Promise.all([fetchUsers, fetchArtworks]).then(results => {
      const [usersResponse, artworksResponse] = results;
  
      const users = usersResponse.data.map(user => ({
        id: user.user_id,
        name: user.user_name,
        imageUrl: user.profile_picture,
        type: 'user' // distinguish between user and artwork
      }));
      console.log(users)
      const artworks = artworksResponse.data.map(artwork => ({
        id: artwork.artwork_id,
        name: artwork.title,
        imageUrl: artwork.image_url,
        type: 'artwork' // distinguish between user and artwork
      }));
  
      const combinedData = [...users, ...artworks];
      setUserNames(combinedData);
      setFilteredUserNames([]);
    }).catch(error => {
      console.error("Failed to fetch data:", error);
      nav.push('/login');
    });
  }, [nav]);
  

  useEffect(() => {
    const filtered = input.trim()
      ? userNames.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
      : [];
    setFilteredUserNames(filtered);
  }, [input, userNames]);

  return (
    <div>
      <div className={styles.searchbar}>
        <FaSearch id="search-icon" style={{color: 'rgb(153,0,0)'}}/>
        <input
          className={styles.input}
          placeholder="Search by username or artwork name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {input && <SearchList results={filteredUserNames} />}
    </div>
  );
}

export default Search;
