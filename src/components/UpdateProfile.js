import React, { useRef, useState } from "react"
import { Card, Button, Alert, Nav, NavDropdown, Form, FormControl } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import app from "../firebase"
import firebase from "firebase/app"
import { auth } from "../firebase"
import Navbar from 'react-bootstrap/Navbar';

export default function UpdateProfile() {
  const [userDataDoc, setUserDataDoc] = useState("")

  // References for form fields
  const nameRef = useRef()
  const ageRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail, fetchUserDocument } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const [name, setName] = useState();

  const [dateOfBirth, setDateOfBirth] = useState(new Date())

  const calculate_age = (dateOfBirth) => {
    var today = new Date();
    var birthDate = new Date(dateOfBirth); 
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
      age_now--;
    }
    return age_now;
  }

  async function getUserData() {
	  const doc = await fetchUserDocument();
	  return doc;
  }
  if (!userDataDoc) {
	  getUserData().then(doc => setUserDataDoc(doc.data()));
  }

  function updateName(name) {
    console.log(name);
    var db = firebase.firestore(app);
    db.collection('Users').doc(auth.currentUser.uid).update({
      Name: name
    });
  }

  function updateAge(date) {
    console.log(name);
    var db = firebase.firestore(app);
    db.collection('Users').doc(auth.currentUser.uid).update({
      DOB: dateOfBirth,
      Age: calculate_age(dateOfBirth),
    });
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    if (nameRef.current.value !== userDataDoc["Name"]) {
      promises.push(updateName(nameRef.current.value ))
    }

    if (dateOfBirth.current.value !== userDataDoc["DOB"]) {
      promises.push(updateAge(dateOfBirth.current.value ))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
        <div class="container">
       <div class="row">
          <div class="col-xl-12">
             <div id="content" class="content content-full-width">
             <Navbar bg="light" expand="lg">
                  <Navbar.Brand href="/">Wassup</Navbar.Brand>
                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
                     <Navbar.Collapse id="basic-navbar-nav">
                     <Nav className="mr-auto">
                           <Nav.Link href="/">Home</Nav.Link>
                           <Nav.Link href="/events">Events</Nav.Link>
                           <Nav.Link href="chat-room"> Chat Room </Nav.Link>
                           <Nav.Link href="/find-friends">Find Friends</Nav.Link>
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
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
                         
                      {/* <!-- BEGIN profile-header-cover --> */}
                      <div class="profile-header-cover">
                          <div class="profile-header-cover-edit pull-right">
                            <a href="#" class="btn btn-sm btn-info mb-3"> 
                              <span class="glyphicon glyphicon-edit" ></span>
                            </a>
                          </div>
                      </div>
                      {/* <!-- END profile-header-cover -->
                      <!-- BEGIN profile-header-content --> */}
                      <div class="profile-header-content">
                         {/* <!-- BEGIN profile-header-img --> */}
                         <div class="profile-header-img">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""></img>
                            
                         </div>
                         {/* <!-- END profile-header-img -->
                         <!-- BEGIN profile-header-info --> */}
                         <div class="profile-header-info">
                         { userDataDoc &&
                            <h4 class="m-t-10 m-b-5">{userDataDoc["Name"]}</h4>
                         }
                            <div>
                              {userDataDoc && userDataDoc["Profession"].join(',')}
                           </div>
                            <a href="/profile-about" class="btn btn-sm btn-dark mb-2">Go back to Profile</a>
                         </div>
                         <div class="profile-header-img-edit">
                         <a href="#" class="btn btn-info btn-sm"> 
                         <span class="glyphicon glyphicon-edit"></span> Edit
                          </a>
                         </div>
                         
                         {/* <a href="/profile-picture-edit" class="btn btn-sm btn-info mb-2">Edit Profile Picture</a> */}
                         {/* <!-- END profile-header-info --> */}
                      </div>
                      {/* <!-- END profile-header-content -->
                      <!-- BEGIN profile-header-tab --> */}
                      <ul class="profile-header-tab nav nav-tabs">
                      <li class="nav-item"> 
                            <Link to="/update-profile" class="nav-link active show" data-toggle="tab">
                                ACCOUNT
                            </Link>
                        </li>
                        <li class="nav-item"> 
                            <Link to="/update-profile-about" class="nav-link" data-toggle="tab">
                                ABOUT
                            </Link>
                        </li>
                         <li class="nav-item">
                            <Link to="/update-profile-interests" class="nav-link" data-toggle="tab">INTERESTS</Link></li>
                            <li class="nav-item"><Link to="/update-preferences" class="nav-link" data-toggle="tab">PREFERENCES</Link>
                         </li> 
                         <li class="nav-item"><Link to="/update-profile-events" class="nav-link" data-toggle="tab">EVENTS</Link>
                         </li>
                         
                      </ul>
                      {/* <!-- END profile-header-tab --> */}
                      </div>
                </div>
                {/* <!-- end profile -->
                <!-- begin profile-content -->*/}
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Account Info</h2>
          {error && <Alert variant="danger">{error}</Alert>}<Form onSubmit={handleSubmit}>
          <Form onSubmit={handleSubmit}>
          <Form.Group id="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                ref={nameRef}
                required
                placeholder={userDataDoc["Name"]}
                defaultValue={userDataDoc["Name"]}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                placeholder={currentUser.email}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="date-of-birth">
              <Form.Label>Date Of Birth</Form.Label>
                <DatePicker
                  onChange={date => setDateOfBirth(date)}
                  ref={dateOfBirth}
                  selected={dateOfBirth}
                  defaultValue={userDataDoc["DOB"]}
                />
            </Form.Group>
            <Button className="w-100" type="submit">
              Update
            </Button>
          </Form>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
      </div>
      </div>
      </div>
      </div>
    </>
  )
}
