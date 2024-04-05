// import React, { useState, useEffect } from 'react';
// import styles from "../styles/loginFormLight.module.css";
// import { FaUser } from "react-icons/fa";
// import { IoLockClosedSharp } from "react-icons/io5";
// import bgVid from '../../assets/videos/lightvid.mp4';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';

// const LoginPage2 = () => {

//   const [email,setEmail] = useState('');
//   const [userName, setUserName] = useState('');
//   const [password, setPassword ] = useState('');

//   const nav = useHistory();
  
//   const loginUser = async (e) => {
//     e.preventDefault(); // Prevent the default form submit action

//     const userData = {
//       email: email,
//       password: password,
//       user_name: userName
//     };

//     axios.post('http://127.0.0.1:5000/api/user/login', userData)
//     .then(function (response) {
//       console.log(response);
//       nav.push("./profile");
//     }).catch(function (error) {
//       console.log(error);
//       if(error.response && error.response.status === 401){
//         alert("Invalid credentials");
//       } else {
//         alert("Error. Please try again");
//       }
//     });
//   }
      
//   return (

//     <div className={styles.main}>
//     <video className={styles.videobg} src={bgVid} autoPlay muted loop/> 
//     <div className={styles.wrapper}>
//       <form action=""> 

//       <div className={styles.header}> 
//         <h1><span className={styles.h1}>VIRTUOS</span><span className={styles.h2}>O</span></h1>
//       </div>
      

//         <div className={styles.inputbox}> 
//           <input className ={styles.input} value ={(userName)||(email)} onChange={(e) => {setUserName(e.target.value)||setEmail(e.target.value)}} type="text" placeholder='Username' required/> 
//           <FaUser className={styles.icon}/>
//         </div>
//         <div className={styles.inputbox}> 
//           <input className ={styles.input} value ={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' required/> 
//           <IoLockClosedSharp className={styles.icon}/>
//         </div>

//         <div className={styles.forgot}> 
//           <label className={styles.in}><input className={styles.in} type="checkbox"/>Remember me</label>
//           <a className ={styles.a} href="#">Forgot password?</a>
//         </div>

//         <button className = {styles.btn} type="submit" onClick ={loginUser}>sign in</button>

//         <div className={styles.register}>
//           <p className={styles.p}>First time here?<a className ={styles.a2} href = './register2'> Register</a></p>
//         </div>

//       </form>
      
//     </div>
//     </div>

//   )
// }

// export default LoginPage2



import React, { useState } from 'react';
import styles from "../styles/loginFormLight.module.css";
import { FaUser } from "react-icons/fa";
import { IoLockClosedSharp } from "react-icons/io5";
import bgVid from '../../assets/videos/lightvid.mp4';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginPage2 = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const nav = useHistory();
  
  const loginUser = async (e) => {
    e.preventDefault(); // Prevent the default form submit action

    const userData = {
      email: email,
      password: password,
      user_name: userName
    };

    axios.post('http://127.0.0.1:5000/api/user/login', userData)
      .then(function (response) {
        // Adjust this line according to your backend response structure
        const token = response.data.auth ? response.data.auth.token : response.data.access_token;
        localStorage.setItem('token', token); // Set token in local storage
        nav.push("./profile"); // Navigate to profile page
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
        <form action=""> 
          <div className={styles.header}> 
            <h1><a href ='./'><span className={styles.h1}>VIRTUOS</span><span className={styles.h2}>O</span></a></h1>
          </div>
          <div className={styles.inputbox}> 
            <input className ={styles.input} value={email || userName} onChange={(e) => setEmail(e.target.value) || setUserName(e.target.value)} type="text" placeholder='Username' required/> 
            <FaUser className={styles.icon}/>
          </div>
          <div className={styles.inputbox}> 
            <input className ={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' required/> 
            <IoLockClosedSharp className={styles.icon}/>
          </div>
          <div className={styles.forgot}> 
            <label className={styles.in}><input className={styles.in} type="checkbox"/>Remember me</label>
            <a className ={styles.a} href="#">Forgot password?</a>
          </div>
          <button className = {styles.btn} type="submit" onClick ={loginUser}>sign in</button>
          <div className={styles.register}>
            <p className={styles.p}>First time here?<a className ={styles.a2} href = './register2'> Register</a></p>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}
export default LoginPage2