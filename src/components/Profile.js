import React, { useRef, useState } from "react"
import { Button, Alert, Nav, NavDropdown, Form, FormControl } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./Profile.css"
import Navbar from 'react-bootstrap/Navbar'

export default function Profile() {
    const [error, setError] = useState("");
    const [userDataDoc, setUserDataDoc] = useState("");
    const { logout, fetchUserDocument } = useAuth();
    const history = useHistory();
    
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
          <div class="col-xl-12">
             <div id="content" class="content content-full-width">
               <Navbar bg="light" expand="lg">
                  <Navbar.Brand href="/">Wassup</Navbar.Brand>
                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
                     <Navbar.Collapse id="basic-navbar-nav">
                     <Nav className="mr-auto">
                           <Nav.Link href="/">Home</Nav.Link>
                           <Nav.Link href="/events">Events</Nav.Link>
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
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""></img>
                         </div>
                         {/* <!-- END profile-header-img -->
                         <!-- BEGIN profile-header-info --> */}
                         <div class="profile-header-info">
                           { userDataDoc &&
                              <h4 class="m-t-10 m-b-5">{userDataDoc["Name"]}</h4>
                           }
                            <div>
                              {userDataDoc && userDataDoc["Profession"] && userDataDoc["Profession"].join(',')}
                           </div>
                           <a href="/update-profile" class="btn btn-sm btn-info mb-2">Edit Profile</a>
                         </div>
                         {/* <!-- END profile-header-info --> */}
                      </div>
                      {/* <!-- END profile-header-content -->
                      <!-- BEGIN profile-header-tab --> */}
                      <ul class="profile-header-tab nav nav-tabs">
                        <li class="nav-item"> 
                            <Link to="/profile-about" class="nav-link" data-toggle="tab">
                                ABOUT
                            </Link>
                        </li>
                         <li class="nav-item">
                            <Link to="/profile-interests" class="nav-link" data-toggle="tab">INTERESTS</Link></li>
                            <li class="nav-item"><Link to="/profile-preferences" class="nav-link" data-toggle="tab">PREFERENCES</Link>
                         </li>
                         <li class="nav-item"><Link to="/profile-events" class="nav-link" data-toggle="tab">EVENTS</Link>
                            
                         </li>
                         <li class="nav-item"><Link to="/profile-friends" class="nav-link  active show" data-toggle="tab">FRIENDS</Link>
                         </li>
                         <li class="nav-item"><Link to="/profile-photos" class="nav-link" data-toggle="tab">PHOTOS</Link>
                        </li>
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
                    <h4 class="m-t-0 m-b-20">
                    <ul class="profile-header-tab nav nav-tabs">
                        <li class="nav-item flex-grow-1 bd-highlight"> 
                            Friend List (14)
                        </li>
                         <li class="nav-item">
                            <Link to="/find-friends" class="nav-link" data-toggle="tab">Find Friends</Link></li>
                     </ul>
                       
                     </h4>
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
