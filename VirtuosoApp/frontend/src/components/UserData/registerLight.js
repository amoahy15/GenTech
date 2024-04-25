import React, { useState, useEffect } from 'react';
import styles from "../styles/registerLight.module.css";
import { FaUser } from "react-icons/fa";
import { IoLockClosedSharp } from "react-icons/io5";
import bgVid from '../../assets/videos/lightvid.mp4';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import placeholder from '../../assets/images/Gustav_Klimt/Gustav_Klimt_2.jpg'


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [category, setCategory] = useState('default_category');

  const nav = useHistory();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchArtworks = async () => {
      if (category) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/artwork/tags/${category}`);
          const artworks = response.data.artworks || [];
          if (artworks.length > 0) {
            const randomIndex = Math.floor(Math.random() * artworks.length);
            setProfilePicture(artworks[randomIndex].image_url);
          } else {
            setProfilePicture(''); 
          }
        } catch (error) {
          console.error(`Error fetching artworks with tag ${category}:`, error);
          setProfilePicture('');
        }
      }
    };
    fetchArtworks();
  }, [category]);




  const registerUser = async (e) => {
    e.preventDefault();
    
    const userData = {
      email: email,
      password: password,
      first_name: firstName, 
      last_name: lastName, 
      user_name: userName,
      profile_picture: profilePicture
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/create_user`, userData);
      console.log(response);
      nav.push("/email-check");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
      } else {
        alert("Error. Please try again");
      }
    }
  }

  return (
    <div className={styles.main}>
       
    {isMobile ? (
        <img src={placeholder} alt="Background" className={styles.videobg} style={{ display: 'cover',height: '100vh', opacity: '0.5'}}/>
        
    ) : (
      <video className={styles.videobg} src={bgVid} autoPlay muted loop />
    )}
      
      <div className={styles.wrapper}>
        <div className={styles.container}>
        <form onSubmit={registerUser} style={{maxWidth: '90vw'}}> {/* Updated to use onSubmit event */}
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

          <button className={styles["btn"]} type="submit">Create Account</button> {/* Changed to type="submit" */}
          {/*<Authenticator/>*/}
        </form>
      </div>
      </div>
    </div>
  );
}

export default Register;
