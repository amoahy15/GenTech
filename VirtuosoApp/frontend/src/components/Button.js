import propTypes from 'prop-types'


const Button = ({color, text, onClick}) => {

    

  return <button onClick={onClick} style={{background: color, color:'#f6f5f1'}} className='btn'>{text}</button>
}

Button.defaultProps = {
    color: '#990000'
}

Button.propTypes = {
    text: propTypes.string,
    color: propTypes.string,
    
}

export default Button
