import React from 'react';
import { useHistory } from 'react-router-dom';
// import styles from "../styles/homepage.module.css";  // Reuse home page styles
import styles from "../styles/emailCheck.module.css"
import Button from "../Navigation/Button";


const EmailCheckPage = () => {
  const history = useHistory();

  const redirectToHome = () => {
    history.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.h1}>
          <span>Check Your Email</span>
        </h1>
        <p className={styles.p}>
          We've sent an email to verify your account. Please click the link provided to complete your registration and start exploring the art world.
        </p>
        <p className={styles.p}>
          If you don't see our email shortly, be sure to check your spam or junk folder. 
        </p>
        <div className={styles.buttonContainer}>
        <Button text="Return to Home" onClick={redirectToHome} />
      </div>
      </div>
    </div>
  );
};

export default EmailCheckPage;
