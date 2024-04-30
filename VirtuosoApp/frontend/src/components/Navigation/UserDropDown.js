import React, {useState, useRef, useEffect} from 'react'
import styles from '../styles/userdropdown.module.css'
import { CSSTransition } from 'react-transition-group';
import { BiArrowBack } from "react-icons/bi";
import Logout from "../UserData/Logout"
import { FaUser } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { ImExit } from "react-icons/im";
 

const UserDropDown = () => {

    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
  
    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    } 


    function DropDownItems(props){
        return (
            <div className ={styles.item} onClick={()=> props.goToMenu && setActiveMenu(props.goToMenu)}>
                {props.children}
            </div>
        )
    }


  return (

    
    <div className={styles.dropdown} style={{ height: menuHeight }} ref={dropdownRef}>
       <CSSTransition in={activeMenu === 'main'} 
       unmountOnExit
       onEnter={calcHeight}
       timeout = {500}
       classNames={{
        enter: styles['menu-primary-enter'],
        enterActive: styles['menu-primary-enter-active'],
        exit: styles['menu-primary-exit'],
        exitActive: styles['menu-primary-exit-active'],
      }}>
       <div className = {styles.menu}>
        <ul>  
             <li>
               <a href = "/profile"><DropDownItems><FaUser style ={{padding: '1vh'}}/>Profile</DropDownItems></a>
             </li>
             <li>
             <a><DropDownItems goToMenu = 'settings'><FaTools style ={{padding: '1vh'}}/>Tools</DropDownItems></a>
            </li>
            <li>
             <a><DropDownItems><ImExit style ={{padding: '1vh'}}/><Logout/></DropDownItems></a>
            </li>
         </ul> 
        </div>
        </CSSTransition>

        <CSSTransition
        in={activeMenu === 'settings'} 
        unmountOnExit
        onEnter={calcHeight}
        timeout={500}
        classNames={{
          enter: styles['menu-secondary-enter'],
          enterActive: styles['menu-secondary-enter-active'],
          exit: styles['menu-secondary-exit'],
          exitActive: styles['menu-secondary-exit-active'],
        }}>
        <div className = {styles.menu}>
        <ul>
             <li>
             <a><DropDownItems goToMenu = 'main'><BiArrowBack /></DropDownItems></a>
            </li>
            <li>
             <a href='/settings'><DropDownItems>Advanced Settings</DropDownItems></a>
            </li>
            <li>
             <a href = '/team'><DropDownItems>The Team</DropDownItems></a>
            </li>
            <li>
            <a href="mailto:gentech.emory@gmail.com"><DropDownItems>Contact Us</DropDownItems></a>
            </li>
        </ul>
        </div>
       </CSSTransition>
    </div>
  )
}

export default UserDropDown
