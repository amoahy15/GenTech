import React from 'react';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import styles from '../styles/profilepopup.module.css'

function DeleteUser({ userId }) {
    const history = useHistory();

    const handleDelete = async () => {
        try {
            
            const token = localStorage.getItem('token');
            
            
            if (!token) {
                alert('Authentication token is missing');
                return; 
            }

            const response = await axios.delete(`http://127.0.0.1:8000/api/user/delete_user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert(response.data.message);
            localStorage.removeItem('token');
            history.push('/'); 
            window.location.reload();
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else {
                alert('Error', error.message);
            }
        }
    };

    return (
        <FaTrashAlt className={styles.delete}
            onClick={handleDelete}
            style={{ cursor: 'pointer', fontSize: '20px' }}
            title="Delete User" 
        />
    );
}

export default DeleteUser;
