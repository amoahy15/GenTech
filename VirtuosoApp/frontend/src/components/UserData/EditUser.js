import React, {useState} from 'react'
import styles from '../styles/profiledropdown.module.css'

const EditUser = () => {

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
               <a><DropDownItems>About Us</DropDownItems></a>
             </li>
             <li>
             <a><DropDownItems >Terms of Service</DropDownItems></a>
            </li>
         </ul> 
        
    </div>
  )
}

export default EditUser
