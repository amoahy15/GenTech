import React, {useState} from 'react'
import styles from '../styles/profiledropdown.module.css'
import ChangeUserName from '../API/ChangeUserName'
import ChangePassword from '../API/ChangePassword'


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
               <a><DropDownItems><ChangeUserName/></DropDownItems></a>
             </li>
             <li>
             <a><DropDownItems ><ChangePassword/></DropDownItems></a>
            </li>
         </ul> 
        
    </div>
  )
}

export default EditUser
