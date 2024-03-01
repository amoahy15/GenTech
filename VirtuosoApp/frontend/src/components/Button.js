import propTypes from 'prop-types'


const Button = ({color, text, onClick}) => {

    

  return <button onClick={onClick} style={{background: color}} className='btn'>{text}</button>
}

Button.defaultProps = {
    color: 'beige'
}

Button.propTypes = {
    text: propTypes.string,
    color: propTypes.string,
}

export default Button
