import styles from "../styles/homepage.module.css";
import HomeBackground from "../../assets/images/HomeBackground.png";
import Button from "../Navigation/Button";
import React, { useState, useEffect} from "react";
const Home = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const isLoggedIn = !!localStorage.getItem('token'); 

  const handleClick = () => {
    console.log("Button clicked!");
};
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {
        !isMobile? (
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.textContainer}>
                <h2 className={styles.h2}>
                  <span>Learn</span>
                  <span style={{ color: "#990000" }}> Art</span>
                </h2>
                <h2 className={styles.h2}>
                  &nbsp;&nbsp;<span>Love</span>
                  <span style={{ color: "#990000" }}> Art</span>
                </h2>
                <h2 className={styles.h2}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Live</span>
                  <span style={{ color: "#990000" }}> Art</span>
                </h2>
                <p
                  className={styles.p}
                  style={{ marginBottom: "30px", maxWidth: "90%" }}
                >
                </p>
                <h1 className={styles.h1}>
                  <span>Virtuos</span>
                  <span style={{ color: "#990000" }}>o is Painting that Picture</span>
                </h1>
                <p className={styles.p}
                  style={{ marginBottom: "30px", maxWidth: "70%" }}>
                </p>

                <p className={styles.p} style={{ marginBottom: "30px", maxWidth: "50%" }}>
                  VIRTUOS<span style={{ color: "#990000" }}>O</span> brings art
                  connoisseurs, artists, critics, and enjoyers a social platform that
                  allows you to rate art and create galleries that exemplify your
                  taste.
                </p>

                <p
                  className={styles.p}
                  style={{ marginBottom: "30px", maxWidth: "50%" }}
                >
                  Explore a variety of genres and styles. Start building your
                  community today and dive into our diverse catalogue.
                </p>
                <div >
                  <a href="/register">
                    <Button text="Create an Account" onClick={handleClick} />
                  </a>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: "10vh" }}></div>
          </div>
        ): (
          <div>
            <div className={styles["txt"]}>
            
            <div className={styles["textOverlay"]}>
              WELCOME TO VIRTUOS<span style={{ color: "#990000" }}>O</span>:<br/>
              <span style={{fontSize: '15px'}}>The social network for art lovers,</span><br/>
              <span style={{fontSize: '15px'}}>a space for creatives to curate their thoughts,</span><br/>
              <span style={{fontSize: '15px'}}>scholars to share their opinions, </span><br/>
              <span style={{fontSize: '15px'}}>and the curious to discover art</span>
              </div>
              {!isLoggedIn && (
                <div className={styles.btn}>
                  <a style={{ textDecoration: 'none', color: 'white' }} href="/register">
                    SIGN UP
                  </a>
                </div>
              )}
        </div>
          </div>

        )
      }
    </div>
  );
};

export default Home;
