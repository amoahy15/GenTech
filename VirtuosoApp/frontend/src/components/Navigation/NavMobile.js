import React, {useState} from "react";
import styles from "../styles/main.module.css";
import spiral from '../../assets/images/fibonacci.png';
import NavItem from "./NavItem"
import DropDownMenuMobile from "./DropDownMenuMobile";
import Button2 from "./navButton";
import Search from "../API/Search";
import SearchList from "./SearchList";
import { Link } from "react-router-dom";
import NavUsersMobile from "./NavUsersMobile";


const NavMobile = () => {
    
    const handleClick = () => {
        console.log('click')
    }



  return (
    
    
      <div className={styles.Nav}>
     
      
      <header className={styles.header} style={{paddingRight: '90px'}}>
      <a className={styles.virtuoso} href = '/' style = {{textDecoration: 'none'}}><span>VIRTUOS</span><span style ={{color: '#990000'}}>O</span></a>
     
      {/*<img className={styles.logo} src={spiral}/>*/}
      <nav className={styles.Nav}>

          <NavItem><DropDownMenuMobile/></NavItem> 

      </nav>
      </header>  
      <div style={{marginBottom: "14vh"}}>
      </div>
    </div>
  )
}

export default NavMobile

