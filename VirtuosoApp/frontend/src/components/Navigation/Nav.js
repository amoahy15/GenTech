import React, {useState} from "react";
import styles from "../styles/main.module.css";
import spiral from '../../assets/images/fibonacci.png';
import {FaSearch} from "react-icons/fa";
import NavItem from "./NavItem"
import DropDownMenu from "./DropDownMenu";
import Button2 from "./navButton";


const Nav = () => {
    
    const onClick = () => {
        console.log('click')
    }

    const[input, setInput] = useState("")

  return (
    
    
      <div className={styles.Nav}>
     
      
      <header className={styles.header} style={{paddingRight: '90px'}}>
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

          <NavItem><DropDownMenu></DropDownMenu></NavItem> 

          <a href='./reviews'><Button2 text='Community' onClick={onClick}/></a>

          <a href = './collections'><Button2 text='Collections' onClick={onClick}/></a>

          <a href="./"><Button2 text='Forum' onClick={onClick}/></a>

      </nav>
      </header>  
    </div>
  )
}

export default Nav

