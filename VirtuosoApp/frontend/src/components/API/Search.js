import React, {useState, useEffect} from 'react'
import {FaSearch} from "react-icons/fa";
import styles from "../styles/searchlist.module.css";
import axios from 'axios';
import SearchList from '../Navigation/SearchList';


const Search = () => {

  const [input, setInput] = useState("");
  const [userNames, setUserNames] = useState([]);
  const [filteredUserNames, setFilteredUserNames] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/list_users`)
      .then(response => {
        const names = response.data.map(user => user.userName);
        setUserNames(names);
        setFilteredUserNames(names);
      })
      .catch(error => console.error("Failed to fetch user names:", error));
  }, []);

  useEffect(() => {
    const filtered = input
      ? userNames.filter(name => name.toLowerCase().includes(input.toLowerCase()))
      : userNames;
    setFilteredUserNames(filtered);
  }, [input, userNames]);
  

  return (
    <div>
    <div className={styles.searchbar}>
        <FaSearch id = "search-icon" style={{color: 'rgb(153,0,0)'}}/>
        <input placeholder="Search" 
        value={input} 
        onChange={(e)=>setInput(e.target.value)}/>
    </div>
      <SearchList results={filteredUserNames} />
    </div>
  
  )
}

export default Search
