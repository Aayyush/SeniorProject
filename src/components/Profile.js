import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./Profile.css"

export default function Profile() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    
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
                            <h4 class="m-t-10 m-b-5">Sean Ngu</h4>
                            <p class="m-b-10">UXUI + Frontend Developer</p>
                            <a href="#" class="btn btn-sm btn-info mb-2">Edit Profile</a>
                         </div>
                         {/* <!-- END profile-header-info --> */}
                      </div>
                      {/* <!-- END profile-header-content -->
                      <!-- BEGIN profile-header-tab --> */}
                      <ul class="profile-header-tab nav nav-tabs">
                         <li class="nav-item"><a href="#profile-about" class="nav-link" data-toggle="tab">ABOUT</a></li>
                         <li class="nav-item"><a href="#profile-videos" class="nav-link" data-toggle="tab">INTERESTS</a></li>
                         <li class="nav-item"><a href="#profile-event" class="nav-link" data-toggle="tab">EVENTS</a></li>
                         <li class="nav-item"><a href="#profile-friends" class="nav-link  active show" data-toggle="tab">FRIENDS</a></li>
                         <li class="nav-item"><a href="#profile-photos" class="nav-link" data-toggle="tab">PHOTOS</a></li>
                      </ul>
                      {/* <!-- END profile-header-tab --> */}
                   </div>
                </div>
                {/* <!-- end profile --> */}
                
        </div>
        </div>
        </div>
    </div>
  )
}
