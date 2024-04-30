import React from 'react';
import styles from "../styles/usercard.module.css";
import UserCard from "./UserCard"
import ArtworkCard from './ArtworkCard';

const SearchList = ({ results }) => {
  return (
    <div className={styles.items}>
      {results.map(item => item.type === 'user'
        ? <UserCard key={item.id} user={item} />
        : <ArtworkCard key={item.id} artwork={item} /> 
      )}
    </div>
  );
}
export default SearchList;