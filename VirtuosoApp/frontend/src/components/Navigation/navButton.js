import propTypes from 'prop-types'
import styles from "../styles/navbutton.module.css";


const Button2 = ({text, onClick}) => {

    

  return <button onClick={onClick}  className={styles.navbtn}>{text}</button>
}


Button2.propTypes = {
    text: propTypes.string,
    
}

export default Button2
