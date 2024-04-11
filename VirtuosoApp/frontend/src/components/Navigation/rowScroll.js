import React from 'react'
import styles from "../styles/row.module.css"


const Row = ({ title, children }) => {
  return (
    <div className={styles.rowContainer}>
      <h2 className={styles.h2}>{title}</h2>
      <div className={styles.rowContent}>
        {children}
      </div>
    </div>
  );
};

export default Row;
