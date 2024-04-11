import React from 'react'
import Search from '../API/Search'
import SearchList from '../Navigation/SearchList'
import styles from "../styles/searchlist.module.css";

const TestSearch = () => {
  return (
    <div className={styles.searchContainer}>
      <Search/>
    </div>
  )
}

export default TestSearch
