import styles from "../styles/homepage.module.css";
import vid from "../../assets/videos/mixkit-artist-mixing-paint-on-a-palette-41611-medium.mp4"
import Button from "../Button";
import Row from "../Navigation/rowScroll";

const Home = () => {
    const onClick = () => {
        console.log('click')
    }
  return (
    <div>

        <div style={{margin: '15vh', flex: 2, maxWidth: '50%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '5000px', overflowY: 'auto', padding: '20px'}}> 
            <h1 className={styles.h1}><span>Share Your</span><span style ={{color: '#990000'}}> Art</span></h1>
            <h1 className={styles.h1}><span>Rate</span><span style = {{color: '#990000'}}> Art</span></h1>
            <h1 className={styles.h1} style ={{marginBottom: '50px'}}>Explore Galleries</h1>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth: '90%'}}>VIRTUOS<span style ={{color: '#990000'}}>O</span> brings art connoisseurs, artists, critics, and enjoyers a social platform that allows you to post art, rate art, and create galleries that exemplify your taste.</p>
            <p className={styles.p} style ={{marginBottom: '30px', maxWidth:'90%'}}>Explore a variety of genres and styles. Start building your community today and dive into our diverse catalogue.</p>
            <div className= {styles.btn}>
            <a href ='./register2'><Button text='Create an Account' onClick={onClick}/></a> 
            </div>
        </div>

        <div style ={{marginBottom: '25vh'}}>
          <video style = {{border: '60px solid rgba(153,0,0, 0.1)'}}className={styles.video} src ={vid} autoPlay muted loop/>
        </div>

        <div>
          <Row title = 'Trending'/>
          <Row title = 'Paintings'/>
          <Row title = 'Architectural'/>
          <Row title = 'Sculptures And Models'/>
        </div>
        


    </div>
  
  )
}

export default Home
