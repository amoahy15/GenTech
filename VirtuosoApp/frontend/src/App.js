import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutPage from "./components/Pages/AboutPage";
import Home from "./components/Pages/Home";
import ReviewPage from "./components/Pages/ReviewPage";
import LoginPage2 from "./components/UserData/loginPageLight";
import Register from "./components/UserData/registerLight";
import Profile from "./components/Pages/Profile";
import Gallery from './components/Pages/Gallery';
import Footer from "./components/Footer";
import NavUser from "./components/Navigation/NavUsers";
import Disclaimer from './components/Pages/Disclaimer';
import TestSearch from "./components/Pages/TestSearch";

function App() {

  const token = localStorage.getItem('token');
  

  return (

    <Router>
    <div className="App">
      <div className="Content">
      <Switch>
        <Route exact path = "/">
          {token ? <NavUser/> : <Nav/>}
          <Home/>
          <Footer/>
        </Route>
        <Route exact path="/about">
          {token ? <NavUser/> : <Nav/>}
          <AboutPage/>
          <Footer/>
        </Route> 
        <Route path="/reviews/:artworkID" render={(props) => (
          <div>
            {token ? <NavUser/> : <Nav/>}
            <ReviewPage {...props} />
            <Footer />
          </div>
        )} />
        <Route exact path="/login">
          <LoginPage2/>
        </Route> 
        <Route exact path="/register">
          <Register/>
        </Route> 
        <Route exact path="/profile">
          {token ? <NavUser/> : <Nav/>}
          <Profile/>
          <Footer/>
        </Route> 
        <Route exact path="/collections">
          {token ? <NavUser/> : <Nav/>}
          <Gallery/>
          <Footer/>
        </Route>
        <Route exact path="/disclaimer">
          <Disclaimer/>
        </Route>
        <Route exact path="/test">
          <TestSearch/>
        </Route>
      </Switch> 
      </div>
    </div>
   
    </Router>
   
    
  );
}

export default App;

