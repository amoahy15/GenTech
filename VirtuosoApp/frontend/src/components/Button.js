import propTypes from 'prop-types'
import styles from "./styles/main.module.css";


const Button = ({color, text, onClick}) => {

    

  return <button onClick={onClick} style={{background: color, color:'#f6f5f1'}} className={styles.btn}>{text}</button>
}

Button.defaultProps = {
    color: '#990000'
}

Button.propTypes = {
    text: propTypes.string,
    color: propTypes.string,
    
}

export default Button
