import React, { useState } from 'react';
import styles from "../styles/registerLight.module.css";
import { FaUser } from "react-icons/fa";
import { IoLockClosedSharp } from "react-icons/io5";
import bgVid from '../../assets/videos/lightvid.mp4';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const Register2 = () => {

  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [firstName, setFirstName] = useState ('');
  const [lastName, setLastName] = useState ('');
  const [userName, setUserName] = useState ('');

  const nav = useHistory();

  const registerUser = async (e) => {
    e.preventDefault(); // Prevent the default form submit action

    const userData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      userName: userName
    };

    axios.post(' http://127.0.0.1:5000/api/create_user', userData)
    .then(function (response) {
      console.log(response);
      nav.push("/about ");
    }).catch(function (error) {
      console.log(error);
      if(error.response && error.response.status === 401){
        alert("Invalid credentials");
      } else {
        alert("Error. Please try again");
      }
    });
}

  return (

    <div className={styles.main}>
    <video className={styles.videobg} src={bgVid} autoPlay muted loop/> 
    <div className={styles.wrapper}>
      <form action=""> 

      <div className={styles.header}> 
        <h1><span className={styles.h1}>VIRTUOS</span><span className={styles.h2}>O</span></h1>
      </div>

        <div className={styles.center}> 
          <input className ={styles.input} value ={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required/> 
        </div>
      
        <div className={styles.inputContainer}> 
        <div className={styles.inputbox}> 
          <input className ={styles.input} value ={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' required/> 
        </div>
        <div className={styles.inputbox}> 
          <input className ={styles.input} value ={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' required/> 
        </div>
        </div>

        <div className = {styles.inputContainer}>
        <div className={styles.inputbox}> 
          <input className ={styles.input} value ={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Username' required/> 
          <FaUser className={styles.icon}/>
        </div>
        <div className={styles.inputbox}> 
          <input className ={styles.input} value ={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required/> 
          <IoLockClosedSharp className={styles.icon}/>
        </div>
        </div>

        <button className = {styles.btn} onClick = {registerUser}>Create Account</button>


      </form>
      
    </div>
    </div>

  )
}

export default Register2; 