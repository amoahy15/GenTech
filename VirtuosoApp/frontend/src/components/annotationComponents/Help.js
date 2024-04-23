import React from "react";
import styles from '../styles/popup.module.css'

const Help = ({ onClose }) => {

  return (
    <div className={styles['popup-background']} style={{overflow: 'auto'}}>
      <div className={styles["popup-box"]} style={{ display: 'flex', justifyContent: 'center', overflow: 'auto', alignItems: 'center', textAlign: 'center' }}>
        
            <h2 className={styles['h2']}>What are annotations?</h2>
            <p className={styles['p']}>Annotations are for when you want to comment on just a 
                small component of the image. For instance, if you want to 
                emphasize the fly on Crivelli's The Lenti Madonna, you may 
                first click 'View annotations'
            </p>
            <p className={styles['p']}>Then select '+'
            </p>

            <p className={styles['p']}>Then click on the part of the image you are interested in
            </p>
            <p className={styles['p']}>Add what you want to say about it, then submit!
            </p>
            <h2 className={styles['h2']}>What are reviews?</h2>
            <p className={styles['p']}>Reviews are for when you want to 
            express your overall thoughts on a work. For example, if you love
            Van Gogh's Starry Night, you may first click 'Write a review'
            </p>
            <p className={styles['p']}>Then select a star rating (this is optional)
            </p>
            <p className={styles['p']}>Then write your thoughts on a work (this is also optional)
            </p>
            <p className={styles['p']}>Then click submit, which will share your thoughts with the world!
            </p>
            <button onClick={onClose} className={styles["closeButton"]}>Close</button>
            </div>
        </div>

  );
};

export default Help;
