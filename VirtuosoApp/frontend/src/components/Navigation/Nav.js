import React, {useState} from "react";
import styles from "../styles/main.module.css";
import spiral from '../../assets/images/fibonacci.png';
import NavItem from "./NavItem"
import DropDownMenu from "./DropDownMenu";
import Button2 from "./navButton";
import Search from "../API/Search";
import SearchList from "./SearchList";


const Nav = () => {
    
    const onClick = () => {
        console.log('click')
    }



  return (
    
    
      <div className={styles.Nav}>
     
      
      <header className={styles.header} style={{paddingRight: '90px'}}>
      <a className={styles.virtuoso} href = './' style = {{textDecoration: 'none'}}><span>VIRTUOS</span><span style ={{color: '#990000'}}>O</span></a>
     
      {/*<img className={styles.logo} src={spiral}/>*/}
      <nav className={styles.Nav}>

          <NavItem><DropDownMenu></DropDownMenu></NavItem> 

          <a href='./reviews'><Button2 text='Community' onClick={onClick}/></a>

          <a href = './collections'><Button2 text='Collections' onClick={onClick}/></a>

          <a href="./"><Button2 text='Filler' onClick={onClick}/></a>

          <ul className={styles.userlist} style ={{marginBottom: "1vh"}}>
            <li><a href="./login2"><button onClick={onClick} className={styles.userbtn}>
              Login</button></a></li>
            <li><a href="./register"><button onClick={onClick} className={styles.userbtn2}>
              Sign Up</button></a></li>
          </ul>

      </nav>
      </header>  
      <div style={{marginBottom: "14vh"}}>
      </div>
    </div>
  )
}

export default Nav

