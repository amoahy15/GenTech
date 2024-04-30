import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from "../styles/emailCheck.module.css"
import Button from "../Navigation/Button";
import HomeBackground from "../../assets/images/VirtuosoLogo.png";



const EmailCheckPage = () => {
  const history = useHistory();

  const redirectToHome = () => {
    history.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.h1}>
          <span>Check your inbox and verify your email!
          </span>
        </h1>
        <p className={styles.p}>
        To activate your Virtuoso account, we first need to verify your email address. Check your inbox. If you haven't received it, please check your spam folder.
        </p>       
      <img
          src={HomeBackground}
          alt="Home Background"
          className={styles.backgroundImage}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button text="Return to Home" onClick={redirectToHome} />
      </div>
    </div>
  );
};

export default EmailCheckPage;
