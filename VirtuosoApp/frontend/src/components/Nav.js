import Button from "./Button"
import {Link} from "react-router-dom"

const Nav = () => {
    
    const onClick = () => {
        console.log('click')
    }
  return (
    
    
      <div className="Nav">
      <div className="virtuoso">VIRTUOSO</div>
      <nav>
        <ul>
          <li><Button color='beige' text='Home' onClick={onClick}/></li>
          <li><Button color='beige' text='Exhibits' onClick={onClick}/></li>
          <li><Button color='beige' text='Profile' onClick={onClick}/></li>
          <li><Button color='beige' text='About' onClick={onClick}/></li> 
          <li><Button color='beige' text='Search' onClick={onClick}/></li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
