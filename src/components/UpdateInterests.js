import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import app from "../firebase"
import firebase from "firebase/app"
import { auth, firestore } from "../firebase"
import 'firebase/firestore';

export default function UpdateInterests() {
  const [userDataDoc, setUserDataDoc] = useState("")

  // References for form fields
  const hobbiesRef = useRef()
  const {fetchUserDocument } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function getUserData() {
	  const doc = await fetchUserDocument();
	  return doc;
  }
  if (!userDataDoc) {
	  getUserData().then(doc => setUserDataDoc(doc.data()));
  }

  function updateHobbies(hobbies, oldHobbies) {
    var db = firebase.firestore(app);
    var hobby;
    var oldHobby;
    const newHobbies = hobbies.split(',');
    for (hobby in newHobbies) {
        if (newHobbies[hobby] && typeof(newHobbies[hobby]) === 'string') {
            db.collection('Users').doc(auth.currentUser.uid).update({
                Hobbies: firebase.firestore.FieldValue.arrayUnion(newHobbies[hobby])
            });
        }
    }
    for (oldHobby in oldHobbies) {
        if (!newHobbies.includes(oldHobbies[oldHobby]) && typeof(oldHobbies[oldHobby]) === 'string') {
            db.collection('Users').doc(auth.currentUser.uid).update({
                Hobbies: firebase.firestore.FieldValue.arrayRemove(oldHobbies[oldHobby])
            });
        }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    const promises = []
    setLoading(true)
    setError("")

    if (hobbiesRef.current.value !== userDataDoc["Hobbies"]) {
        promises.push(updateHobbies(hobbiesRef.current.value, userDataDoc["Hobbies"]))
      }

    Promise.all(promises)
      .then(() => {
        history.push("/profile-interests")
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
                            <a href="/profile-interests" class="btn btn-sm btn-dark mb-2">Go back to Profile</a>
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
                            <Link to="/update-profile" class="nav-link " data-toggle="tab">
                                ACCOUNT
                            </Link>
                        </li>
                        <li class="nav-item"> 
                            <Link to="/update-profile-about" class="nav-link" data-toggle="tab">
                                ABOUT
                            </Link>
                        </li>
                         <li class="nav-item">
                            <Link to="/update-profile-interests" class="nav-link  active show" data-toggle="tab">INTERESTS</Link></li>
                            
                         <li class="nav-item"><Link to="/update-profile-events" class="nav-link" data-toggle="tab">EVENTS</Link>
                            
                         </li>
                         <li class="nav-item"><Link to="/update-profile-friends" class="nav-link" data-toggle="tab">FRIENDS</Link>
                         </li>
                         
                      </ul>
                      {/* <!-- END profile-header-tab --> */}
                      </div>
                </div>
                {/* <!-- end profile -->
                <!-- begin profile-content -->*/}
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Your Interests</h2>
          {error && <Alert variant="danger">{error}</Alert>}<Form onSubmit={handleSubmit}>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="hobbies">
              <Form.Label>Interests (Comma Separated)</Form.Label>
              <Form.Control 
              type="text" 
              ref={hobbiesRef} 
              placeholder={userDataDoc["Hobbies"]}
              defaultValue={userDataDoc["Hobbies"]}
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
