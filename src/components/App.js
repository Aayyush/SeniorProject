import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Profile from "./Profile"
import ProfileAbout from "./ProfileAbout"
import ProfileInterest from "./ProfileInterest"
import ProfilePhotos from "./ProfilePhotos"
import UpdateAbout from "./UpdateAbout"
import UpdateInterests from "./UpdateInterests"
import FindFriends from "./FindFriends"
import UpdatePreferences from "./Test"
import ProfilePreferences from "./ProfilePreferences"

function App() {
  return (
    <Container
      className="d-flex"
      style={{ minHeight: "100vh"}}
    >
      <div className="app" style={{ width: "100%"}}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/update-profile-about" component={UpdateAbout} />
              <PrivateRoute path="/update-profile-friends" component={UpdateProfile} />
              <PrivateRoute path="/find-friends" component={FindFriends} />
              <PrivateRoute path="/update-profile-events" component={UpdateProfile} />
              <PrivateRoute path="/update-profile-interests" component={UpdateInterests} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/profile-interests" component={ProfileInterest} />
              <PrivateRoute path="/profile-about" component={ProfileAbout} />
              <PrivateRoute path="/profile-preferences" component={ProfilePreferences} />
              <PrivateRoute path="/profile-photos" component={ProfilePhotos} />
              <PrivateRoute path="/update-preferences" component={UpdatePreferences} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
