import React, { useRef, useState } from "react";
import { Button, Alert, Nav, NavDropdown, Form, FormControl } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import app from "../firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { auth } from "../firebase";
import "./Profile.css";
import Navbar from 'react-bootstrap/Navbar';

export default function ProfilePreferences() {
  const [error, setError] = useState("");
  const [userDataDoc, setUserDataDoc] = useState("");
  const { currentUser, logout, fetchUserDocument } = useAuth();
  const history = useHistory();
  const [value, setValue] = React.useState([0, 100]);

  async function getUserData() {
    const doc = await fetchUserDocument();
    return doc;
  }
  if (!userDataDoc) {
    getUserData().then((doc) => setUserDataDoc(doc.data()));
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div id="content" class="content content-full-width">
          <Navbar bg="light" expand="lg">
                  <Navbar.Brand href="/">Wassup</Navbar.Brand>
                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
                     <Navbar.Collapse id="basic-navbar-nav">
                     <Nav className="mr-auto">
                           <Nav.Link href="/">Home</Nav.Link>
                           <Nav.Link href="/events">Events</Nav.Link>
                           <Nav.Link href="chat-room"> Chat Room </Nav.Link>
                           <Nav.Link href="/find-friends" >Find Friends</Nav.Link>
                           <NavDropdown title="Profile" id="basic-nav-dropdown" active>
                           <NavDropdown.Item href="/profile-about">About</NavDropdown.Item>
                           <NavDropdown.Item href="/profile-interests">Interests</NavDropdown.Item>
                           <NavDropdown.Item href="/profile-preferences">Preferences</NavDropdown.Item>
                           <NavDropdown.Item href="/profile-friends">Friends</NavDropdown.Item>
                           <NavDropdown.Item href="/profile-events">Events</NavDropdown.Item>
                           <NavDropdown.Item href="/profile-photos">Photos</NavDropdown.Item>
                           <NavDropdown.Divider />
                           <NavDropdown.Item href="/update-profile">Update Profile</NavDropdown.Item>
                           </NavDropdown>
                     </Nav>
                     <Form inline>
                     <FormControl type="text" placeholder="Search Events" className="mr-md-4" />
                           <Button variant="outline-success">Search</Button>
                     </Form>
                     </Navbar.Collapse>
                  </Navbar>
            {/* <!-- begin profile --> */}
            <div class="profile">
              <div class="profile-header">
                {/* <!-- BEGIN profile-header-cover --> */}
                <div class="profile-header-cover"></div>
                {/* <!-- END profile-header-cover -->
                      <!-- BEGIN profile-header-content --> */}
                <div class="profile-header-content">
                  {/* <!-- BEGIN profile-header-img --> */}
                  <div class="profile-header-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      alt=""
                    ></img>
                  </div>
                  {/* <!-- END profile-header-img -->
                         <!-- BEGIN profile-header-info --> */}
                  <div class="profile-header-info">
                    {userDataDoc && (
                      <h4 class="m-t-10 m-b-5">{userDataDoc["Name"]}</h4>
                    )}
                    <div>
                      {userDataDoc &&
                        userDataDoc["Profession"] &&
                        userDataDoc["Profession"].join(",")}
                    </div>
                    <a
                      href="/update-preferences"
                      class="btn btn-sm btn-info mb-2"
                    >
                      Edit Profile
                    </a>
                  </div>
                  {/* <!-- END profile-header-info --> */}
                </div>
                {/* <!-- END profile-header-content -->
                      <!-- BEGIN profile-header-tab --> */}
                <ul class="profile-header-tab nav nav-tabs">
                  <li class="nav-item">
                    <Link
                      to="/profile-about"
                      class="nav-link"
                      data-toggle="tab"
                    >
                      ABOUT
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      to="/profile-interests"
                      class="nav-link"
                      data-toggle="tab"
                    >
                      INTERESTS
                    </Link>
                  </li>

                  <li class="nav-item">
                     <Link to="/profile-preferences" class="nav-link active show" data-toggle="tab">
                        PREFERENCES
                     </Link>
                         </li>

                  <li class="nav-item">
                    <Link
                      to="/profile-events"
                      class="nav-link"
                      data-toggle="tab"
                    >
                      EVENTS
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/profile-friends" class="nav-link" data-toggle="tab">
                      FRIENDS
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link
                      to="/profile-photos"
                      class="nav-link"
                      data-toggle="tab"
                    >
                      PHOTOS
                    </Link>
                  </li>
                </ul>
                {/* <!-- END profile-header-tab --> */}
              </div>
            </div>
            {/* <!-- end profile -->
               {/* <!-- end tab-content --> */}
          </div>
          <div class="profile-content">
            {/* <!-- begin tab-content --> */}
            <div class="tab-content p-0">
              {/* <!-- begin #profile-about tab --> */}
              <div class="tab-pane fade in active show" id="profile-about">
                <h4 id="bio">
                  <p align="left"> Preferences</p>
                </h4>
                {/* <!-- begin row --> */}
                <div class="row row-space-2">
                  {/* <!-- begin col-6 --> */}
                  <div class="box">
                    <span>
                        <strong>Age Range: </strong>
                    </span>
                    <center>
                    {userDataDoc && userDataDoc["Preferences"] && (
                        <div>
                            <span class="text-left"> Minimum: {userDataDoc["Preferences"]["AgeRange"][0]} </span>
                            <p class="text-left"> Maximum: {userDataDoc["Preferences"]["AgeRange"][1]}</p>
                        </div>
                    )}
                    </center>
					
					<span>
                        <strong>Max Distance: </strong>
                    </span>
                    <center>
                    {userDataDoc && userDataDoc["Preferences"] && (
                        <div>
                            <span class="text-left"> Distance set: {userDataDoc["Preferences"]["MaxDistance"]} </span>
                        </div>
                    )}
                    </center>
                    {/* <button type="button" align = 'right'> Edit Bio </button> */}
                    <p></p>
                    </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end profile-content --> */}
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
