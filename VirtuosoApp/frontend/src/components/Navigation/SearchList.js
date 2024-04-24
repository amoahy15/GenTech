import React from 'react';
import styles from "../styles/searchlist.module.css";
import UserCard from "./UserCard"
import ArtworkCard from './ArtworkCard';
//HERE
const SearchList = ({ results }) => {
  return (
    <div className={styles.userGrid}>
      {results.map(item => item.type === 'user'
        ? <UserCard key={item.id} user={item} />
        : <ArtworkCard key={item.id} artwork={item} /> 
      )}
    </div>
  );
}
export default SearchList;