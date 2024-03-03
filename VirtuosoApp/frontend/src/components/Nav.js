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
          <a href='./'><Button color='beige' text='Home' onClick={onClick}/></a>
          <div class="divider"/>
          <a><Button color='beige' text='Exhibits' onClick={onClick}/></a>
          <div class="divider"/>
          <a><Button color='beige' text='Profile' onClick={onClick}/></a>
          <div class="divider"/>
          <a href ='./about'><Button color='beige' text='About' onClick={onClick}/></a> 
          <div class="divider"/>
          <a><Button color='beige' text='Search' onClick={onClick}/></a> 
        </ul>
      </nav>
    </div>
  )
}

export default Nav
