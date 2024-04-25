import React, {useState} from "react";
import styles from "../styles/main.module.css";
import spiral from '../../assets/images/fibonacci.png';
import {FaSearch} from "react-icons/fa";
import UserIcon from "./UserIcon";
import Button2 from "./navButton";
import DropDownMenu from "./DropDownMenu";
import UserDropDown from "../UserData/UserDropDown";
import NavItem from "./NavItem";
import Search from "../API/Search";

const NavUser = () => {
    
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

          <NavItem><DropDownMenu></DropDownMenu></NavItem> 

          <a href='/search'><Button2 text='Search' onClick={onClick}/></a>

          <a href = '/collections'><Button2 text='Gallery' onClick={onClick}/></a>

          <UserIcon category = "profile"><UserDropDown></UserDropDown></UserIcon>

      </nav>
      </header>  
      <div style={{marginBottom: "14vh"}}>
      </div>
    </div>
  )
}

export default NavUser

