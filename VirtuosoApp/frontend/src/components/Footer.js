import React from "react";
import { Link } from "react-router-dom";
import styles from './styles/footer.module.css';

const Footer = () => {
  return (
      <footer style={{marginTop: '25px'}}>
        <div className={styles.content}>
            <div className={styles.top}>
                <div>
                    <Link to="/" className={styles.title} style = {{fontStyle: 'normal', textDecoration: 'none', color: 'black', fontSize: '28px'}}><span>VIRTUOS</span><span style ={{color: '#990000'}}>O</span></Link>
                </div>
            </div>
            <div className={styles['boxes']}>
                <ul className={styles.box}>
                    <li className={styles.title}>VIRTUOSO</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/collections">Collections</Link></li>
                </ul>
                <ul className={styles.box}>
                    <li className={styles.title}>MEET  GENTECH</li>
                    <li><a href="https://github.com/amoahy15/GenTech">Github</a></li>
                    <li><a href="mailto:gentech.emory@gmail.com">Contact Us</a></li>
                    <li><Link to="/team">The Team</Link></li> 
                </ul>
                <ul className={styles.box}>
                <li className={styles.linkname}>RESOURCES</li>
                    <li><a href="https://www.nga.gov/open-access-images.html">National Gallery of Art</a></li>
                    <li><a href="https://www.metmuseum.org/">The MET</a></li>
                </ul>
            </div>
        </div>
        <div className={styles['boxes']} style={{textAlign: 'right'}}>
                    <a href="/disclaimer" className={styles.txt} style={{paddingLeft: '55px'}}>Privacy policy</a>
                    <a href="/disclaimer" className={styles.txt}>Terms of Service</a>
                    <a href="/disclaimer" className={styles.txt}>Disclaimer</a>
        </div>
      </footer>
  )
}

export default Footer;
