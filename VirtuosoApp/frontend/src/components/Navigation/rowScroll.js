import React from 'react'
import styles from "../styles/row.module.css"
import Images from '../API/Images'
import {HiChevronRight, HiChevronLeft} from 'react-icons/hi'

const Row = ({title}) => {
  return (
    <div>
      <h2 className={styles.h2}>{title}</h2>
      <HiChevronLeft size={45} className ={styles.arrows}/>
      <Images/>
      <HiChevronRight size={45} className ={styles.arrows}/>
    </div>
  )
}

export default Row
