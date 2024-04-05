import React, {useState} from 'react'
import styles from '../styles/dropdown.module.css'

const DropDownMenu = () => {

    function DropDownItems(props){
        return (
            <div className ={styles.item}>
                {props.children}
            </div>
        )
    }


  return (
    
    <div className={styles.dropdown}>
       
        <ul className={styles.menu}>  
             <li>
               <a href='./about'><DropDownItems>About Us</DropDownItems></a>
             </li>
             <li>
             <a><DropDownItems >Terms of Service</DropDownItems></a>
            </li>
         </ul> 
        
    </div>
  )
}

export default DropDownMenu
