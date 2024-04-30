import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UpdatePassword from '../API/UpdatePassword'
import UpdateUsername from '../API/UpdateUserName'
import styles from '../styles/profilepopup.module.css'
import ProfilePic from './ProfilePic';
import DeleteUser from '../API/DeleteUser';


const AdvancedSettings = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    email: '',
    id: '',
    user_name: 'Loading...',
    bio: 'Loading bio...',
    firstname: '',
    lastname: ''
  });

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found!");
      history.push('/login'); // Redirect to login if no token
      window.location.reload();
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/details`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('API Response:', response.data);
        setUserData({
          email: response.data.email,
          id: response.data.user_id,
          user_name: response.data.user_name, 
          bio: response.data.bio,
          firstname: response.data.first_name,
          lastname: response.data.last_name
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []); 

  const [popup, setPopup] = useState(false);

  const togglePopup = () =>{
      setPopup(!popup)
  }

  return (
    <div>
      <div style={{marginTop: '7vh',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className={styles.user}>
        <h1 className={styles.h1}>{userData.user_name}'s Advanced Settings</h1>
      </div>
      </div>

      <div style={{marginTop: '2vh',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className={styles.pic}>
        <ProfilePic/>
      </div>
      </div>

      <div style={{marginTop: '2vh',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className={styles.user}>
        <a href={`mailto:${userData.email}`}>{userData.email}</a>
      </div>
      </div>

    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div style={{flex: 2, maxWidth: '50%', border: '1px solid #cccccc', borderRadius: '10px', marginTop: '7vh', marginBottom: '15vh', padding: '10px', maxHeight: '900px', overflow: 'auto' }}>
    <h1 style ={{marginLeft: '3vh', marginBottom: '1vh'}} className={styles.h1}>Info:</h1>
    <div style={{marginLeft:'2vh',marginRight: '2vh',flex: 2, maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '500px', overflow: 'auto' }}>
    <div  style ={{marginTop:'2vh'}}><p className={styles.h1}>User ID: </p><p className={styles.bio}>{userData.id}</p></div>
    </div>
    <div style={{marginTop: '2vh', marginLeft:'2vh',marginRight: '2vh',flex: 2, maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '500px', overflow: 'auto' }}>
    <div  style ={{marginTop:'2vh'}}><p className={styles.h1}>First Name: </p><p className={styles.bio}>{userData.firstname}</p></div>
    </div>
    <div style={{marginTop: '2vh', marginLeft:'2vh',marginRight: '2vh',flex: 2, maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '500px', overflow: 'auto' }}>
    <div  style ={{marginTop:'2vh'}}><p className={styles.h1}>Last Name: </p><p className={styles.bio}>{userData.lastname}</p></div>
    </div>
    <div style={{marginTop: '2vh', marginLeft:'2vh',marginRight: '2vh',flex: 2, maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '500px', overflow: 'auto' }}>
    <div  style ={{marginTop:'2vh'}}><UpdatePassword/></div>
    </div>
    <div style={{marginTop: '2vh',marginLeft:'2vh',marginRight: '2vh',flex: 2, maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '500px', overflow: 'auto' }}>
    <div style ={{marginTop:'2vh'}}><UpdateUsername/></div>
    </div>
   <div style={{ display: 'flex', justifyContent: 'center'}}>
    <button style ={{marginTop: '2vh'}}
    onClick = {togglePopup}
    className={styles.btn2}
    >
    Delete Account
    </button>
    </div>
    </div>

    {popup && (<div>
        <div className={styles.background}>
        <div className={styles.box}>
          <p className={styles.h1}>Are you sure you want to delete your account?</p>
          <p className={styles.h1}>Are you sure you want to <span style={{color: 'rgba(153,0,0,1)'}}>Gogh?</span></p>
          <p className={styles.h1} style ={{marginBottom: '2vh'}}>There is no recovery beyond this point.</p>
                <div className={styles.group}>
                <DeleteUser userId={userData.id}/>
                <button className={styles.btn} onClick={togglePopup}>Cancel</button>
                </div>
              </div>
          </div>
        </div>)}

    </div>
    </div>
  )
}

export default AdvancedSettings
