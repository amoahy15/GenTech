import React from "react";
import styles from '../styles/popup.module.css'
import annotate from '../../assets/images/clickannotate.png'
import plus from '../../assets/images/plusbtn.png'
import reddot from '../../assets/images/reddot.png'
import annotationtxt from '../../assets/images/annotationtxt.png'
import hoverannotate from '../../assets/images/hoverannotate.png'
import writereview from '../../assets/images/writereview.png'
import revstars from '../../assets/images/revstars.png'
import revtext from '../../assets/images/revtext.png'
const Help = ({ onClose }) => {

  return (
    <div className={styles['popup-background']}>
      <div className={styles["popup-box"]}>
        
            <h2 className={styles['h2']}>What are annotations?</h2>
            <p className={styles['p']}>Annotations are for when you want to comment on just a 
                small component of the image. For instance, if you want to 
                emphasize the fly on Crivelli's <i>Madonna and Child</i>, you may 
                first click 'View annotations'
            </p>
            <div className={styles.images}>
            <img src={annotate}></img>
            </div>
            <p className={styles['p']}>Then select '+'</p>
            <div className={styles.images}>
            <img src={plus}></img>
            </div>

            <p className={styles['p']}>Then click on the part of the image you are interested in</p>
            <div className={styles.images}>
            <img src={reddot}></img>
            </div>
            <p className={styles['p']}>Add what you want to say about it, then submit!</p>
            <div className={styles.images}>
            <img src={annotationtxt}></img>
            </div>
            <p className={styles['p']}>Now when you hover over your annotation, it renders your corresponding
            marker.</p>
            <div className={styles.images}>
            <img src={hoverannotate}></img>
            </div>
            <h2 className={styles['h2']}>What are reviews?</h2>
            <p className={styles['p']}>Reviews are for when you want to 
            express your overall thoughts on a work. For example, if you love
            Monet's <i>The Japanese Footbridge</i>, but don't have any thoughts on a specific
            element, you may first click 'Write a review' </p>
            <div className={styles.images}>
            <img src={writereview}></img>
            </div>
            <p className={styles['p']}>Then select a star rating (this is optional)
            </p>
            <div className={styles.images}>
            <img src={revstars}></img>
            </div>
            <p className={styles['p']}>Then write your thoughts on a work (this is also optional), and click submit, which will share your thoughts with the world!
            </p>
            <div className={styles.images}>
            <img src={revtext}></img>
            </div>
            <button onClick={onClose} className={styles["closeButton"]}>Close</button>
            </div>
        </div>

  );
};

export default Help;
