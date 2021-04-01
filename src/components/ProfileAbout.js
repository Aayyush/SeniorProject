import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import app from "../firebase"
import firebase from "firebase/app"
import 'firebase/firestore'
import { auth } from "../firebase"
import "./Profile.css"

export default function ProfileAbout() {
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
      getUserData().then(doc => setUserDataDoc(doc.data()));
   }

   async function handleLogout() {
      setError("")
   
      try {
      await logout()
      history.push("/login")
      } catch {
      setError("Failed to log out")
      }
   }

  return (
    <div class="container">
       <div class="row">
          <div class="col-md-12">
             <div id="content" class="content content-full-width">
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
                            <a href="/update-profile-about" class="btn btn-sm btn-info mb-2">Edit Profile</a>
                         </div>
                         {/* <!-- END profile-header-info --> */}
                      </div>
                      {/* <!-- END profile-header-content -->
                      <!-- BEGIN profile-header-tab --> */}
                      <ul class="profile-header-tab nav nav-tabs">
                        <li class="nav-item"> 
                            <Link to="/profile-about" class="nav-link   active show" data-toggle="tab">
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
               {/* <!-- end tab-content --> */}
               </div>
            <div class="profile-content">
              {/* <!-- begin tab-content --> */}
              <div class="tab-content p-0">
                 {/* <!-- begin #profile-about tab --> */}
                 <div class="tab-pane fade in active show" id="profile-about">
                    <h4 id = 'bio'>
                    <p align="left"> Bio</p>
                     </h4>
                    {/* <!-- begin row --> */}
                    <div class="row row-space-2">
                       {/* <!-- begin col-6 --> */}
                       <div class="box">
                       <center>
                           <p class="text-left">
                           {userDataDoc["Bio"]}
                           
                           </p>
                        </center>
                        {/* <button type="button" align = 'right'> Edit Bio </button> */}
                        <p></p>
                        <p>
                           <span> <strong>Profession: </strong></span>
                           { userDataDoc &&
                            <ul>
                              {userDataDoc["Profession"].map((value, index) => {
                              return <li key={index}>{value}</li>
                              })}
                           </ul>
                           }
                           </p>
                        {/* <button type="button" align = 'right'> Edit Profession </button> */}
                        <p></p>
                        <p><span>
                           <strong>Skills: </strong></span>
                           { userDataDoc &&
                            <ul>
                              {userDataDoc["Skills"].map((value, index) => {
                              return <li key={index}>{value}</li>
                              })}
                           </ul>
                           }
                        </p>
                        {/* <button type="button" align = 'right'> Edit Skills </button> */}
                        
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
  )
}
