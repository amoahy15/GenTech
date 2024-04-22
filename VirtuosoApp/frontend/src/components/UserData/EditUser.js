import React, {useState} from 'react'
import styles from '../styles/profiledropdown.module.css'
import UpdateUsername from '../API/UpdateUserName'
import UpdatePassword from '../API/UpdatePassword'


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
               <a><DropDownItems><UpdatePassword></UpdatePassword></DropDownItems></a>
             </li>
             <li>
            
            </li>
         </ul> 
        
    </div>
  )
}

export default EditUser
