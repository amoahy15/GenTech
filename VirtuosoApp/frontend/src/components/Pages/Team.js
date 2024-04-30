import styles from "../styles/team.module.css";
import TeamImg from "../../assets/images/OurTeam.png";

const Team = () => {
  return (
    <div className={styles.teamContainer}>
      <div className={styles.headingContainer}>
        <h2 className={styles.h2}>The Virtuous of VIRTUOS<span style={{ color: '#990000' }}>O</span></h2>
        <h3 className={styles.subheading}>  Meet Team Gen<span style={{ color: '#990000' }}>Tech</span></h3>
      </div>
      <div className={styles.teamImageContainer}>
        <img src={TeamImg} alt="Our Team" className={styles.teamImage} />
        <div className={styles.captionContainer}>
          <div className={styles.caption} style={{ top: '75%', left: '4%' }}>
            <div style={{color: 'black'}}>Chloe Bickel-Smith</div>
            <div>Computer Science</div>
          </div>
          <div className={styles.caption} style={{ top: '75%', left: '22%' }}>
            <div  style={{color: 'black'}}>Humphrey Amoakhene</div>
           <div>Computer Science</div>
          </div>
            <div className={styles.caption} style={{ top: '75%', left: '42%' }}>
            <div  style={{color: 'black'}}>Ivan Martinez-Kay</div>
            <div>Computer Science</div>
          </div>
          <div className={styles.caption} style={{ top: '75%', left: '60%' }}>
            <div  style={{color: 'black'}}>Jose Izaguirre I</div>
            <div>Computer Science</div>
          </div>
          <div className={styles.caption} style={{ top: '75%', left: '80%' }}>
            <div  style={{color: 'black'}}>Tierra Ablorh</div>
            <div>Computer Science</div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Team;