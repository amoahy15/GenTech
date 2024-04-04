import React, {useState} from 'react'
import ProfilePic from '../UserData/ProfilePic';

const UserIcon = (props) => {

  
    const child = <ProfilePic size={10}/>;
    const[open, setOpen] = useState(false);

  return (
    <div>
        <div className="profile-photo-nav">
        <a className='icon-button' onClick={() => setOpen(!open)}>
             {child}
        </a>
        </div>
         {open && props.children}
    </div>
  )
}

export default UserIcon
