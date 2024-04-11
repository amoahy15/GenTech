import React from 'react';
import styles from "../styles/searchlist.module.css";

const SearchList = ({ results }) => { // Accept results as props
  return (
    <div className={styles.searchlist}>
      {results.map((name, index) => (
        <div key={index}>{name}</div>
      ))}
    </div>
  );
}

export default SearchList;
