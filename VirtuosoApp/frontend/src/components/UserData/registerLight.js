import React, { useState } from 'react';
import styles from "../styles/registerLight.module.css";
import { FaUser } from "react-icons/fa";
import { IoLockClosedSharp } from "react-icons/io5";
import bgVid from '../../assets/videos/lightvid.mp4';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Authenticator from './Authenticator';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');

  const nav = useHistory();

  const registerUser = async (e) => {
    e.preventDefault();
    
    const userData = {
      email: email,
      password: password,
      first_name: firstName, 
      last_name: lastName, 
      user_name: userName
    };

    axios.post('http://127.0.0.1:5000/api/user/create_user', userData)
      .then(function (response) {
        console.log(response);
        const token = response.data.auth ? response.data.auth.token : response.data.access_token;
        localStorage.setItem('token', token);
        nav.push("./profile");
        window.location.reload();
      }).catch(function (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials");
        } else {
          alert("Error. Please try again");
        }
      });
  }

  return (
    <div className={styles.main}>
      <video className={styles.videobg} src={bgVid} autoPlay muted loop />
      <div className={styles.wrapper}>
        <div className={styles.container}>
        <form onSubmit={registerUser}> {/* Updated to use onSubmit event */}

          <div className={styles.header}>
            <h1><a href='./'><span className={styles.h1}>VIRTUOS</span><span className={styles.h2}>O</span></a></h1>
          </div>

          <div className={styles.center}>
            <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.inputbox}>
              <input className={styles.input} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' required />
            </div>
            <div className={styles.inputbox}>
              <input className={styles.input} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' required />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.inputbox}>
              <input className={styles.input} value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Username' required />
              <FaUser className={styles.icon} />
            </div>
            <div className={styles.inputbox}>
              <input className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
              <IoLockClosedSharp className={styles.icon} />
            </div>
          </div>

          <button className={styles.btn} type="submit">Create Account</button> {/* Changed to type="submit" */}
          <Authenticator/>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Register;
