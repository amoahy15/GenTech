import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import Home from "./components/Home";

function App() {
  return (

    <Router>
     <div className="App">
      <Nav/>
      <div className="Content">
      <Switch>
        <Route exact path="/" element ={<Home/>}/>
        <Route path="/about" element ={<AboutPage/>}/>
      </Switch> 
      </div>
    </div>
    </Router>
   
    
  );
}

export default App;

