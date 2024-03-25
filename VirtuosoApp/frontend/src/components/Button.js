import propTypes from 'prop-types'
import styles from "./styles/main.module.css";


const Button = ({color, text, onClick}) => {

    

  return <button onClick={onClick} style={{background: color, color:'black'}} className={styles.btn}>{text}</button>
}

Button.defaultProps = {
    color: 'rgba(153,0,0,.1)'
}

Button.propTypes = {
    text: propTypes.string,
    color: propTypes.string,
    
}

export default Button
