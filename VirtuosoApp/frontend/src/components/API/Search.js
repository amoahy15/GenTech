import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import styles from "../styles/searchlist.module.css";
import axios from 'axios';
import SearchList from '../Navigation/SearchList';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [input, setInput] = useState("");
  const [items, setitems] = useState([]);
  const [filtereditems, setfiltereditems] = useState([]);
  const nav = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found!");
      nav.push('/login');
      window.location.reload();
      return;
    }
  
    const fetchUsers = axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/list_users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  
    const fetchArtworks = axios.get(`${process.env.REACT_APP_API_BASE_URL}/artwork/getartwork`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  
    
    Promise.all([fetchUsers, fetchArtworks]).then(results => {
      const [usersResponse, artworksResponse] = results;
  
      const users = usersResponse.data.map(user => ({
        id: user.user_id,
        name: user.user_name,
        imageurl: user.profile_picture,
        username: user.user_name,
        type: 'user' 
      }));
      //console.log(users)
      const artworks = artworksResponse.data.map(artwork => ({
        id: artwork.artwork_id,
        name: artwork.title,
        imageurl: artwork.image_url,
        type: 'artwork'
      }));
  
      const data = [...users, ...artworks];
      setitems(data);
      setfiltereditems([]);
    }).catch(error => {
      console.error("Failed to fetch data:", error);
      nav.push('/login');
    });
  }, [nav]);
  

  useEffect(() => {
    //if we have more time we can filter by artist name, etc
    const filtered = input.trim()
      ? items.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
      : []; 
    setfiltereditems(filtered);
  }, [input, items]);

  return (
    <div style={{minHeight: '80vh' , paddingTop: '3vh', minHeight: '80vh',justifyContent: 'center' }}>
      <div className={styles.searchbar}>
        <FaSearch id="search-icon" style={{color: 'rgb(153,0,0)'}}/>
        <input className={styles.input}
          placeholder="Search for users by username or artwork by its title"
          value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {/* only shows results if the user inputs something */}
      {input && <SearchList results={filtereditems} />}
    </div>
  );
}

export default Search;
