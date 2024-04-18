import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Authenticator = () => {

  const [user, setUser] = useState({});
  const nav = useHistory(); 

  function handleCallbackResponse(response) {
    try{
    console.log("Encoded JWT ID token " + response.credential);
    var userObj = jwtDecode(response.credential);
    console.log(userObj);
    setUser(userObj)

    const userData = {
      email: user.email,
      firstName: user.given_name, 
      lastName: user.family_name,
      userName: user.name,
    };

    Backend(userData);
    
    } catch (error){
      console.error("Error decoding JWT", error);
    }
  }

  const Backend = async (userData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/create_user', userData);
      console.log(response);
      nav.push('./'); 
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {/* global google */ google.accounts.id.initialize({
    client_id: "535693072951-dbvsehbrrtp6frmub9k199naus9nikg2.apps.googleusercontent.com",
    callback: handleCallbackResponse 
  });
  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    { theme: "outline", size: "large" }
  )

  }, []);

  return (
    <div id="signInDiv">

    </div>
  )
}

export default Authenticator
