import styles from "../styles/homepage.module.css";
import HomeBackground from "../../assets/images/HomeBackground.png";
import Button from "../Navigation/Button";
import Row from "../Navigation/rowScroll";
import Carousel from "../carouselcomponents/Carousel";
import Collections from "./Collections";

const Home = () => {
  const onClick = () => {
    console.log("click");
  };

  return (
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
          <p
            className={styles.p}
            style={{ marginBottom: "30px", maxWidth: "70%" }}
          >
          </p>
          <p
            className={styles.p}
            style={{ marginBottom: "30px", maxWidth: "50%" }}
          >
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
          <div className={styles.btn}>
            <a href="./register2">
              <Button text="Create an Account" onClick={onClick} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.background}>
        <img
          src={HomeBackground}
          alt="Home Background"
          className={styles.backgroundImage}
        />
      </div>
      <div style={{ marginBottom: "25vh" }}></div>

      <div>
        <Row title="Trending">
          <Collections category="trending" />
        </Row>
        <Row title="Paintings">
          <Collections category="paintings" />
        </Row>
        <Row title="Photographs">
          <Collections category="photographs" />
        </Row>
        <Row title="Sculptures And Models">
          <Collections category="sculptures" />
        </Row>
      </div>
    </div>
  );
};

export default Home;
