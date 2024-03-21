import React, { useState, useEffect } from 'react';
import styles from "../styles/loginFormLight.module.css";
import { FaUser } from "react-icons/fa";
import { IoLockClosedSharp } from "react-icons/io5";
import bgVid from '../../assets/videos/lightvid.mp4';
import axios from 'axios';

const LoginPage2 = () => {



  return (

    <div className={styles.main}>
    <video className={styles.videobg} src={bgVid} autoPlay muted loop/> 
    <div className={styles.wrapper}>
      <form action=""> 

      <div className={styles.header}> 
        <h1><span className={styles.h1}>VIRTUOS</span><span className={styles.h2}>O</span></h1>
      </div>
      

        <div className={styles.inputbox}> 
          <input className ={styles.input} type="text" placeholder='Username' required/> 
          <FaUser className={styles.icon}/>
        </div>
        <div className={styles.inputbox}> 
          <input className ={styles.input} type="password" placeholder='Password' required/> 
          <IoLockClosedSharp className={styles.icon}/>
        </div>

        <div className={styles.forgot}> 
          <label className={styles.in}><input className={styles.in} type="checkbox"/>Remember me</label>
          <a className ={styles.a} href="#">Forgot password?</a>
        </div>

        <button className = {styles.btn} type="submit">sign in</button>

        <div className={styles.register}>
          <p className={styles.p}>First time here?<a className ={styles.a2} href="/register2"> Register</a></p>
        </div>

      </form>
      
    </div>
    </div>

  )
}

export default LoginPage2
