import React, {useState, useEffect, useRef} from 'react'
import styles from "../styles/dropdown.module.css"
import { HiDotsHorizontal } from "react-icons/hi";

const NavItem = (props) => {

    const child = <HiDotsHorizontal className={styles.btn} size={30}/>;
    const[open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
      const checkIfClickedOutside = (e) => {
          if (open && ref.current && !ref.current.contains(e.target)) {
              setOpen(false);
          }
      };

      document.addEventListener("mousedown", checkIfClickedOutside);

      return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside);
      };
    }, [open]);

  return (
    <div ref = {ref}>
   
        <a className='icon-button' onClick={() => setOpen(!open)}>
             {child}
        </a>

         {open && props.children}
    </div>
  )
}

export default NavItem
