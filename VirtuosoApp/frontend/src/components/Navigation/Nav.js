import Button from "../Button"
import styles from "../styles/main.module.css";
import spiral from '../../assets/images/fibonacci.png';


const Nav = () => {
    
    const onClick = () => {
        console.log('click')
    }
  return (
    
    
      <div className={styles.Nav}>
     
      
      <header className={styles.header}>
      <a className={styles.virtuoso} href = './' style = {{textDecoration: 'none'}}><span>VIRTUOS</span><span style ={{color: '#990000'}}>O</span></a>
      <img className={styles.logo} src={spiral}/>
      <nav className={styles.Nav}>

          <a href='./'><Button text='Home' onClick={onClick}/></a>

          <a><Button text='Exhibits' onClick={onClick}/></a>

          <a><Button text='Profile' onClick={onClick}/></a>

          <a href ='./about'><Button text='About' onClick={onClick}/></a> 
          
      </nav>
      </header>  
    </div>
  )
}

export default Nav
