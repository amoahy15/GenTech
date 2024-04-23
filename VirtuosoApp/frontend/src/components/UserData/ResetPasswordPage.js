import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import styles from "../styles/resetPasswordPage.module.css";
import logo from "../../assets/images/VirtuosoLogo.png"

const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false); 
  const history = useHistory();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPasswords = () => {
    setShowPasswords(!showPasswords);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleResetSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/reset_password/${resetToken}`,
        { password }
      )
      .then((response) => {
        history.push("/login");
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        alert("Failed to reset password. Please try again.");
      });
  };

  return (
    <div className={styles.screen_container}>
      <div className={styles.small_container}>
      <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.h1}>Reset Password</h1>
        <div className={styles.inputContainer}>
          <p className={styles.p}>New Password</p>
          <input
            type={showPasswords ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.p}>Confirm Password</p>
          <input
            type={showPasswords ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm new password"
            className={styles.input}
          />
        </div>
        <label className={styles.toggle}>
          <input type="checkbox" checked={showPasswords} onChange={toggleShowPasswords} />
          Show Passwords
        </label>
        <button className={styles.btn} onClick={handleResetSubmit}>
          Submit New Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
