import React from 'react'
import { useHistory } from 'react-router-dom';

const Logout = () => {

    const nav = useHistory();

    const handleLogout = () =>{
        
        localStorage.removeItem('token');
        nav.push('./login2');
    }

    return(
        <button onClick={handleLogout}>Logout</button>
    )
}

export default Logout
