import React, {useState, useEffect, useRef} from 'react'
import ProfilePic from '../UserData/ProfilePic';

const UserIcon = (props) => {

  
    const child = <ProfilePic category = "profile" size={10}/>;
    const[open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
      const checkIfClickedOutside = (e) => {
          if (open && ref.current && !ref.current.contains(e.target)) {
              setOpen(false);
          }
      };

      document.addEventListener("mousedown", checkIfClickedOutside);

      return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside);
      };
    }, [open]);

  return (
    <div ref = {ref}>
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
