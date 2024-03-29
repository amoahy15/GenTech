import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import Home from "./components/Home";
import ReviewPage from "./components/ReviewPage";

function App() {
  return (

    <Router>
     <div className="App">
     <Nav/>
      <div className="Content">
      <Switch>
        <Route exact path = "/">
          <Home/>
        </Route>
        <Route path="/about">
          <AboutPage/>
        </Route> 
        <Route path="/reviews">
          <ReviewPage/>
        </Route> 
      </Switch> 
      </div>
    </div>
    </Router>
   
    
  );
}

export default App;

