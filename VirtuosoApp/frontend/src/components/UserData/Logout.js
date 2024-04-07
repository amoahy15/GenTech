import React from 'react'
import { useHistory } from 'react-router-dom';

const Logout = () => {


    const nav = useHistory();
    localStorage.removeItem('token');
    nav.push('/login');

}

export default Logout
