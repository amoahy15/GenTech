import Button from "../Button";
import styles from "../styles/main.module.css";
import spiral from '../../assets/images/fibonacci.png';

import { Link } from "react-router-dom";

const Nav = () => {
    
    const onClick = (e) => {
        e.preventDefault();
        console.log('click');
    };

  return (
    <div className={styles.Nav}>
      <header className={styles.header}>
        <Link to="/" className={styles.virtuoso} style={{ textDecoration: 'none' }}>
          <span>VIRTUOS</span>
          <span style={{color: '#990000'}}>O</span>
        </Link>
        <img className={styles.logo} src={spiral} alt="Fibonacci Spiral" />
        <nav className={styles.Nav}>
          {/* Use Link or NavLink from react-router-dom for navigation */}
          <Link to="/"><Button text='Home' onClick={onClick}/></Link>
          {/* For actions, not navigation, use button. For navigation without page reload, use Link */}
          <button onClick={onClick}><Button text='Exhibits' /></button>
          <button onClick={onClick}><Button text='Profile' /></button>
          <Link to="/about"><Button text='About' onClick={onClick}/></Link>
        </nav>
      </header>  
    </div>
  )
}

export default Nav;
