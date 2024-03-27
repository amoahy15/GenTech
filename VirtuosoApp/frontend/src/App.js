import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutPage from "./components/Pages/AboutPage";
import Home from "./components/Pages/Home";
import ReviewPage from "./components/Pages/ReviewPage";
import LoginPage from "./components/UserData/loginPageDark";
import LoginPage2 from "./components/UserData/loginPageLight";
import Register2 from "./components/UserData/registerLight";



function App() {


  return (

    <Router>
    <div className="App">
      <div className="Content">
      <Switch>
        <Route exact path = "/">
          <Nav/>
          <Home/>
        </Route>
        <Route path="/about">
          <Nav/>
          <AboutPage/>
        </Route> 
        <Route path="/reviews">
          <Nav/>
          <ReviewPage/>
        </Route> 
        <Route path="/login">
          <LoginPage/>
        </Route>
        <Route path="/login2">
          <LoginPage2/>
        </Route> 
        <Route path="/register2">
          <Register2/>
        </Route> 
      </Switch> 
      </div>
    </div>
   
    </Router>
   
    
  );
}

export default App;
