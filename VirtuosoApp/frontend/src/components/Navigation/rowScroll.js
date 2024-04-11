import React from 'react'
import styles from "../styles/row.module.css"
import Images from '../API/Images'
import {HiChevronRight, HiChevronLeft} from 'react-icons/hi'

const Row = ({ title, children }) => {
  return (
    <div className={styles.rowContainer}>
      <h2 className={styles.h2}>{title}</h2>
      <div className={styles.rowContent}>
        <HiChevronLeft size={45} className={styles.arrows} />
        {children}
        <HiChevronRight size={45} className={styles.arrows} />
      </div>
    </div>
  );
};

export default Row;
