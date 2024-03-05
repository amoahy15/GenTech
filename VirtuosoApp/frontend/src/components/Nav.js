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
          <a href='./'><Button text='Home' onClick={onClick}/></a>
          <div class="divider"/>
          <a><Button text='Exhibits' onClick={onClick}/></a>
          <div class="divider"/>
          <a><Button text='Profile' onClick={onClick}/></a>
          <div class="divider"/>
          <a href ='./about'><Button text='About' onClick={onClick}/></a> 
          <div class="divider"/>
          <a><Button  text='Search' onClick={onClick}/></a> 
        </ul>
      </nav>
    </div>
  )
}

export default Nav
