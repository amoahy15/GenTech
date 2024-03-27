import React, {useState} from 'react'
import styles from "../styles/dropdown.module.css"
import { HiDotsHorizontal } from "react-icons/hi";

const NavItem = (props) => {

    const child = <HiDotsHorizontal className={styles.btn} size={30}/>;
    const[open, setOpen] = useState(false);

  return (
    <div>
   
        <a className='icon-button' onClick={() => setOpen(!open)}>
             {child}
        </a>

         {open && props.children}
    </div>
  )
}

export default NavItem
