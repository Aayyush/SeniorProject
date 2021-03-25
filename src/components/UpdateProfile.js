import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
  const nameRef = useRef()
  const ageRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

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
          <div class="col-md-12">
             <div id="content" class="content content-full-width">
                {/* <!-- begin profile --> */}
                <div class="profile">
                   <div class="profile-header">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
                         
                      {/* <!-- BEGIN profile-header-cover --> */}
                      <div class="profile-header-cover">
                          {/* <div class="profile-header-cover-edit"  style="float:right">
                            <a href="#" class="btn btn-sm mb-3"> 
                              <span class="glyphicon glyphicon-edit" ></span>
                            </a>
                          </div> */}
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
                            <h4 class="m-t-10 m-b-5">Sean Ngu</h4>
                            <p class="m-b-10">UXUI + Frontend Developer <span class="glyphicon glyphicon-edit"></span></p>
                            <a href="/profile-about" class="btn btn-sm btn-info mb-2">Go back to Profile</a>
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
                            <Link to="/profile-login-update" class="nav-link active show" data-toggle="tab">
                                ACCOUNT
                            </Link>
                        </li>
                        <li class="nav-item"> 
                            <Link to="/profile-about" class="nav-link" data-toggle="tab">
                                ABOUT
                            </Link>
                        </li>
                         <li class="nav-item">
                            <Link to="/profile-interests" class="nav-link" data-toggle="tab">INTERESTS</Link></li>
                            
                         <li class="nav-item"><Link to="/profile-events" class="nav-link" data-toggle="tab">EVENTS</Link>
                            
                         </li>
                         <li class="nav-item"><Link to="/profile" class="nav-link" data-toggle="tab">FRIENDS</Link>
                         </li>
                         <li class="nav-item"><Link to="/profile-photos" class="nav-link" data-toggle="tab">PHOTOS</Link>
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
          <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                ref={nameRef}
                required
                defaultValue={currentUser.name}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
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
            <Form.Group id="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="Age"
                ref={ageRef}
                required
                defaultValue={currentUser.age}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
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
