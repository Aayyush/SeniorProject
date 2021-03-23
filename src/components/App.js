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

function App() {
  return (
    <Container
      className="d-flex"
      style={{ minHeight: "100vh" }}
    >
      <div className="app" style={{ maxWidth: "100000px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/profile-interests" component={ProfileInterest} />
              <PrivateRoute path="/profile-about" component={ProfileAbout} />
              <PrivateRoute path="/profile-photos" component={ProfilePhotos} />
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
