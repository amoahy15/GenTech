import Button from "../Button"
import styles from "../styles/main.module.css";
import {Link} from "react-router-dom"

const Nav = () => {
    
    const onClick = () => {
        console.log('click')
    }
  return (
    
    
      <div className={styles.Nav}>
      <div className={styles.virtuoso}>VIRTUOSO</div>
      <nav className={styles.nav}>
        <ul>
          <a href='./'><Button text='Home' onClick={onClick}/></a>
          <div class={styles.divider}/>
          <a><Button text='Exhibits' onClick={onClick}/></a>
          <div class={styles.divider}/>
          <a><Button text='Profile' onClick={onClick}/></a>
          <div class={styles.divider}/>
          <a href ='./about'><Button text='About' onClick={onClick}/></a> 
          <div class={styles.divider}/>
          <a><Button  text='Search' onClick={onClick}/></a> 
        </ul>
      </nav>
    </div>
  )
}

export default Nav
