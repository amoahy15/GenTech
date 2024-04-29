import styles from "../styles/aboutpage.module.css";
import { useEffect, useState } from 'react';

const AboutPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={isMobile ? styles.aboutMobile : styles.aboutDesktop}>
      <div className={styles.aboutContent}>
        <h1 className={styles.h1}><span>Vir•tu•o•</span><span style={{ color: '#990000' }}>WHO?</span></h1>
          <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}>Virtuos<span style ={{color: '#990000'}}>o</span> is more than a social network for art lovers. Virtuos<span style ={{color: '#990000'}}>o</span> is  a space that welcomes</p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}><span style ={{color: '#990000'}}>the explorer</span></p>
            
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}><span style ={{color: '#990000'}}>the creative</span></p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}><span style ={{color: '#990000'}}>student</span></p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}> and anywhere in between! </p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}>Virtuos<span style ={{color: '#990000'}}>o</span> is more than a digital museum. Virtuos<span style ={{color: '#990000'}}>o</span> ignores the 
            “Do Not Touch the Glass” boundaries inviting users to--</p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}><span style ={{color: '#990000'}}>document their thoughts</span></p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}><span style ={{color: '#990000'}}>annotate the works</span></p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}><span style ={{color: '#990000'}}>rate</span></p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}><span style ={{color: '#990000'}}>like ratings</span></p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}><span style ={{color: '#990000'}}>experiment wih exhibits</span></p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}><span style ={{color: '#990000'}}>and most importantly, just be--</span></p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}><span style ={{color: '#990000'}}>their artistic self</span></p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}>Well thats enough words.</p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}>Much like art we invite you to just</p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}>see it for yourself.</p>
      </div>
    </div>
  );
};
export default AboutPage;
