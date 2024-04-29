import React, {useState} from 'react'
import styles from '../styles/dropdown.module.css'

const DropDownMenuMobile = () => {

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
               <a href='/login'><DropDownItems>Login</DropDownItems></a>
             </li>
             <li>
               <a href='/register'><DropDownItems>Sign Up</DropDownItems></a>
             </li>
             <li>
               <a href='/collections'><DropDownItems>Galleries</DropDownItems></a>
             </li>
             <li>
             <a href='/about'><DropDownItems >About Us</DropDownItems></a>
            </li>
             <li>
             <a href='/disclaimer'><DropDownItems >Disclaimer</DropDownItems></a>
            </li>
         </ul> 
        
    </div>
  )
}

export default DropDownMenuMobile
