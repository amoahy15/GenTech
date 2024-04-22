import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles/resetPassword.module.css";
import axios from "axios";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = () => {
    console.log("Password reset request for:", email);
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/request_password_reset`, { email })
      .then(response => {
        console.log('Reset email sent:', response.data.message);
        alert("Please check your email to reset your password.");
        redirectToHome(); 
      })
      .catch(error => {
        console.error('Error sending reset password email:', error);
        alert("Failed to send reset password email. Please try again.");
      });
  };

  const redirectToHome = () => {
    history.push("/");
  };

  return (
    <div className={styles.screen_container}>
      <div className={styles.medium_box}>
        <div className={styles.small_container}>
          <h1 className={styles.h1}>Reset Your Password</h1>
          <p className={styles.h2}>Enter your email to reset your password.</p>
          <div className={styles.inputContainer}>
            <p className={styles.p}>Email</p>
            <div className={styles.inputbox}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email address"
                className={styles.input}
              />
            </div>
          </div>
          <button className={styles.btn} onClick={handleResetPassword}>
            Reset Password
          </button>
          <div className={styles.flexContainer}>
            <p className={styles.pLabel}>Remember Your Password?</p>
            <button className={styles.btnInline} onClick={redirectToHome}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
