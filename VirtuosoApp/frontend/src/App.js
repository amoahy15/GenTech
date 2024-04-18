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
import NavUser from "./components/Navigation/NavUsers";
import Disclaimer from './components/Pages/Disclaimer';
import TestSearch from "./components/Pages/TestSearch";
import ArtworkDisplay from "./components/API/ArtworkDisplay";

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
        <Route path="/about">
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
          {token ? <NavUser/> : <Nav/>}
          <Profile/>
          <Footer/>
        </Route> 
        <Route path="/collections">
          {token ? <NavUser/> : <Nav/>}
          <Collection/>
          <Footer/>
        </Route>
        <Route path="/disclaimer">
          <Disclaimer/>
        </Route>
        <Route path="/test">
          <TestSearch/>
        </Route>
        <Route path="/artwork/:artworkID" component={ArtworkDisplay} />
      </Switch> 
      </div>
    </div>
   
    </Router>
   
    
  );
}

export default App;

