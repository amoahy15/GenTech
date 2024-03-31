import styles from "../styles/homepage.module.css";
import VirtuosoLogo from "../../assets/images/VirtuosoLogo.png"
import Button from "../Button";
const AboutPage = () => {
  const onClick = () => {
    console.log('click')
  }
  return (
    
    <div className={"About"}>
       <div style={{margin: '15vh', flex: 2, maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '5000px', overflowY: 'auto', padding: '20px'}}> 
            <div style={{maxWidth: '50vw'}}>
            <h1 className={styles.h1}><span>Vir•tu•o•</span><span style ={{color: '#990000'}}>WHO?</span></h1>
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
            <div className={styles.background}>
                <img src={VirtuosoLogo} alt="Home Background" className={styles.backgroundImage}style={{marginTop: '100px', width: '40vw', paddingLeft: '10vw', paddingTop: '10vh'}} />
            </div>
            <div className= {styles.btn}>
            <a href ='./register'><Button text='Review Sneak Peak' onClick={onClick}/></a> <a href ='./register'><Button text='Trending Sneak Peak' onClick={onClick}/></a> <a href ='./register'><Button text='Annotations Sneak Peak' onClick={onClick}/></a> 
            </div>

            <div className="about-section-image-container">
             
            </div>
        </div>

        <div>
        </div>
    </div>
  )
}

export default AboutPage;