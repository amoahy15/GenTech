import React, {useState, useEffect} from "react";
import styles from "../styles/main.module.css";
import spiral from '../../assets/images/fibonacci.png';
import {FaSearch} from "react-icons/fa";
import UserIcon from "./UserIcon";
import Button2 from "./navButton";
import DropDownMenu from "./DropDownMenu";
import UserDropDownMobile from "./UserDropDownMobile";
import NavItem from "./NavItem";
import Search from "../API/Search";

const NavUsersMobile = () => {
    
    const onClick = () => {
        console.log('click')
    }

    const[input, setInput] = useState("")


  return (
    
    
      <div className={styles.Nav}>
     
      
      <header className={styles.header} style={{paddingRight: '90px'}}>
      <a className={styles.virtuoso} href = '/' style = {{textDecoration: 'none'}}><span>VIRTUOS</span><span style ={{color: '#990000'}}>O</span></a>
     
      {/*<img className={styles.logo} src={spiral}/>*/}
      <nav className={styles.Nav}>

          <UserIcon category = "profile"><UserDropDownMobile></UserDropDownMobile></UserIcon>

      </nav>
      </header>  
      <div style={{marginBottom: "14vh"}}>
      </div>
    </div>
  )
}

export default NavUsersMobile

