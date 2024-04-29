import React, {useState} from 'react'
import styles from '../styles/profilepopup.module.css'
import Post from '../API/Post';

const PopUpUser = () => {

    const [popup, setPopup] = useState(false);

    const togglePopup = () =>{
        setPopup(!popup)
    }


  return (
    <div>
        
    </div>

  )
}

export default PopUpUser
