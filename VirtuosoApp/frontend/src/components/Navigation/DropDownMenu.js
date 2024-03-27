import React, {useState} from 'react'
import styles from '../styles/dropdown.module.css'

const DropDownMenu = () => {

    const [activeMenu, setActiveMenu] = useState('main')

    function DropDownItems(props){
        return (
            <a className ={styles.item}>
                {props.children}
            </a>
        )
    }


  return (
    
    <div className={styles.dropdown}>
       
        <ul className={styles.menu}>  
             <li>
                <a href='./about'><DropDownItems>About Us</DropDownItems></a>
             </li>
             <li>
                <DropDownItems >Terms of Service</DropDownItems>
            </li>
         </ul> 
        
    </div>
  )
}

export default DropDownMenu
