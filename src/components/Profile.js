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
                {/* <!-- end profile -->
                <!-- begin profile-content --> */}
            <div class="profile-content">
              {/* <!-- begin tab-content --> */}
              <div class="tab-content p-0">
                 {/* <!-- begin #profile-friends tab --> */}
                 <div class="tab-pane fade in active show" id="profile-friends">
                    <h4 class="m-t-0 m-b-20">Friend List (14)</h4>
                    {/* <!-- begin row --> */}
                    <div class="row row-space-2">
                       {/* <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">James Pittman  </b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle" aria-expanded="false"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                      <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">Mitchell Ashcroft</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">Ella Cabena</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle" aria-expanded="false"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">Declan Dyson</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">George Seyler</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">Patrick Musgrove</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">Taj Connal</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">Laura Pollock</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">Dakota Mannix</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">Timothy Woolley</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">Benjamin Congreve</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">Mariam Maddock</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">Blake Gerrald</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 -->
                       <!-- begin col-6 -->
                       <!-- end col-6 -->
                       <!-- begin col-6 --> */}
                       <div class="col-md-6 m-b-2">
                          <div class="p-10 bg-white">
                             <div class="media media-xs overflow-visible">
                                <a class="media-left" href="javascript:;">
                                <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" class="media-object img-circle"></img>
                                </a>
                                <div class="media-body valign-middle">
                                   <b class="text-inverse">Gabrielle Bunton</b>
                                </div>
                                <div class="media-body valign-middle text-right overflow-visible">
                                   <div class="btn-group dropdown">
                                      <a href="javascript:;" class="btn btn-default">Friends</a>
                                      <a href="javascript:;" data-toggle="dropdown" class="btn btn-default dropdown-toggle"></a>
                                      <ul class="dropdown-menu dropdown-menu-right">
                                         <li><a href="javascript:;">Action 1</a></li>
                                         <li><a href="javascript:;">Action 2</a></li>
                                         <li><a href="javascript:;">Action 3</a></li>
                                         <li class="divider"></li>
                                         <li><a href="javascript:;">Action 4</a></li>
                                      </ul>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       {/* <!-- end col-6 --> */}
                    </div>
                    {/* <!-- end row --> */}
                 </div>
                 {/* <!-- end #profile-friends tab --> */}
              </div>
              {/* <!-- end tab-content --> */}
           </div>
           {/* <!-- end profile-content --> */}
        </div>
        </div>
        </div>
    </div>
  )
}
