import React from 'react'
import { useHistory } from 'react-router-dom';
import styles from "../styles/dropdownbtn.module.css"

const Logout = () => {

    const nav = useHistory();

    const handleLogout = () =>{
        
        localStorage.removeItem('token');
        nav.push('./login2');
    }

    return(
        <button onClick={handleLogout}  className = {styles.btn} style ={{fontFamily: "Poppins, sans-serif", 
        fontSize:"calc(.75*(1vh + 1vw))", 
        fontWeight: "525", 
        height: "50px", }}>Logout</button>
    )
}

export default Logout
