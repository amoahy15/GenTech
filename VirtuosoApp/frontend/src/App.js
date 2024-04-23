import Nav from "./components/Navigation/Nav";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutPage from "./components/Pages/AboutPage";
import Home from "./components/Pages/Home";
import ReviewPage from "./components/Pages/ReviewPage";
import LoginPage2 from "./components/UserData/loginPageLight";
import Register from "./components/UserData/registerLight";
import Profile from "./components/Pages/Profile";
import Gallery from "./components/Pages/Gallery";
import Footer from "./components/Footer";
import NavUser from "./components/Navigation/NavUsers";
import Disclaimer from "./components/Pages/Disclaimer";
import TestSearch from "./components/Pages/TestSearch";
import VerificationPage from "./components/UserData/EmailVerification";
import EmailCheckPage from "./components/UserData/EmailCheckPage";
import ResetPassword from "./components/UserData/ResetPassword";
import ResetPasswordCheck from "./components/UserData/ResetPasswordCheck";
import ResetPasswordPage from "./components/UserData/ResetPasswordPage";
import Loading from "./components/Navigation/Loading";

function App() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
        {loading && <Loading />}
        <div className="Content">
          <Switch>
            <Route exact path="/">
              {token ? <NavUser /> : <Nav />}
              <Home />
              <Footer />
            </Route>
            <Route path="/about">
              {token ? <NavUser /> : <Nav />}
              <AboutPage />
              <Footer />
            </Route>
            <Route
              path="/reviews/:artworkID"
              render={(props) => (
                <div>
                  {token ? <NavUser /> : <Nav />}
                  <ReviewPage {...props} />
                  <Footer />
                </div>
              )}
            />
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/login2">
              <LoginPage2 />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/profile">
              {token ? <NavUser /> : <Nav />}
              <Profile />
              <Footer />
            </Route>
            <Route path="/collections">
              {token ? <NavUser /> : <Nav />}
              <Gallery />
              <Footer />
            </Route>
            <Route path="/disclaimer">
              <Disclaimer />
            </Route>
            <Route path="/test">
              <TestSearch />
            </Route>
            <Route path="/reset-password">
              <ResetPassword />
            </Route>
            <Route path="/reset-password-check">
              <ResetPasswordCheck />
            </Route>
            <Route path="/email-check">
              <EmailCheckPage />
            </Route>
            <Route
              path="/verify/:userId/:verificationToken"
              component={VerificationPage}
            />
            <Route
              path="/reset_password/:resetToken"
              component={ResetPasswordPage}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
