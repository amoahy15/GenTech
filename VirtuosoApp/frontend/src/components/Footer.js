import React from "react";
import styles from './styles/footer.module.css';
import mainstyles from './styles/main.module.css'

const Footer = () => {
  return (
      <footer style={{marginTop: '25px'}}>
        <div className={styles.content}>
            <div className={styles.top}>
                <div>
                    <a className={styles.title} href = './' style = {{fontStyle: 'normal', textDecoration: 'none', color: 'black', fontSize: '28px'}}><span>VIRTUOS</span><span style ={{color: '#990000'}}>O</span></a>
                </div>
            </div>
            <div className={styles['boxes']}>
                <ul className={styles.box}>
                    <li className={styles.title}>VIRTUOSO</li>
                    <li><a href="./">Home</a></li>
                    <li><a href="./about">About</a></li>
                    <li><a href="./collections">Collections</a></li>
                </ul>
                <ul className={styles.box}>
                    <li className={styles.title}>MEET  GENTECH</li>
                    <li><a href="https://github.com/amoahy15/GenTech">Github</a></li>
                    <li><a href="mailto:gentech.emory@gmail.com">Contact Us</a></li>
                </ul>
                <ul className={styles.box}>
                <li className={styles.linkname}>RESOURCES</li>
                    <li><a href="https://www.nga.gov/open-access-images.html">National Gallery of Art</a></li>
                    <li><a href="https://www.metmuseum.org/">The MET</a></li>
                </ul>
                {/*<ul className={styles.box}>
                    <li className={styles.title}>Let's get connected!</li>
                    <li><input type="text" placeholder="Enter your email" /></li>
                    <li><input type="button" value="SUBSCRIBE" /></li>
                </ul>*/}
            </div>
        </div>
        <div className={styles['boxes']} style={{textAlign: 'right'}}>
                    <a href="./disclaimer" className={styles.txt} style={{paddingLeft: '55px'}}>Privacy policy</a>
                    <a href="./disclaimer" className={styles.txt}>Terms of Service</a>
                    <a href="./disclaimer" className={styles.txt}>Disclaimer</a>
        </div>
      </footer>
  )
}

export default Footer;
