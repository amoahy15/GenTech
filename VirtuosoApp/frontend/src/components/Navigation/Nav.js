import React, {useState} from "react";
import Button from "../Button"
import styles from "../styles/main.module.css";
import spiral from '../../assets/images/fibonacci.png';
import {FaSearch} from "react-icons/fa";


const Nav = () => {
    
    const onClick = () => {
        console.log('click')
    }

    const[input, setInput] = useState("")

  return (
    
    
      <div className={styles.Nav}>
     
      
      <header className={styles.header}>
      <a className={styles.virtuoso} href = './' style = {{textDecoration: 'none'}}><span>VIRTUOS</span><span style ={{color: '#990000'}}>O</span></a>
      <div className={styles.searchbar}>
        <FaSearch id = "search-icon" style={{color: 'rgb(153,0,0)'}}/>
        <input className={styles.searchinput} 
        placeholder="Search" 
        value={input} 
        onChange={(e)=>setInput(e.target.value)}/>
      </div>
      {/*<img className={styles.logo} src={spiral}/>*/}
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
