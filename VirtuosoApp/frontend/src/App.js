import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutPage from "./components/Pages/AboutPage";
import Home from "./components/Pages/Home";
import ReviewPage from "./components/Pages/ReviewPage";
import LoginPage from "./components/UserData/loginPageDark";
import LoginPage2 from "./components/UserData/loginPageLight";
import Register from "./components/UserData/registerLight";
import Profile from "./components/Pages/Profile";
import Collection from "./components/Pages/Collections";
import Footer from "./components/Footer";

function App() {


  return (

    <Router>
    <div className="App">
      <div className="Content">
      <Switch>
        <Route exact path = "/">
          <Nav/>
          <Home/>
          <Footer/>
        </Route>
        <Route path="/about">
          <Nav/>
          <AboutPage/>
          <Footer/>
        </Route> 
        <Route path="/reviews">
          <Nav/>
          <ReviewPage/>
          <Footer/>
        </Route> 
        <Route path="/login">
          <LoginPage/>
        </Route>
        <Route path="/login2">
          <LoginPage2/>
        </Route> 
        <Route path="/register">
          <Register/>
        </Route> 
        <Route path="/profile">
          <Nav/>
          <Profile/>
          <Footer/>
        </Route> 
        <Route path="/collections">
          <Nav/>
          <Collection/>
          <Footer/>
        </Route>
      </Switch> 
      </div>
    </div>
   
    </Router>
   
    
  );
}

export default App;

