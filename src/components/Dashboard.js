import React, { useState } from "react"
import { Card, Button, Alert, Nav, NavDropdown, Form, FormControl } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import { makeStyles } from '@material-ui/core/styles';
import './Profile.css'

const useStyles = makeStyles({
  root: {
  },
});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
var d = R * c; // Distance in km
return d;
}

function deg2rad(deg) {
return deg * (Math.PI/180)
}

export default function Dashboard() {
  const [error, setError] = useState("");
  const classes = useStyles();
  const [userDataDoc, setUserDataDoc] = useState("")
  const [suggestedFriends, setSuggestedFriends] = useState("");
  const { currentUser, logout, fetchUserDocument, fetchAllUsers,getUserID, addFriend } = useAuth()
  const history = useHistory()

  const [friendsDataDoc, setallFriendsData] = useState("");

  async function getFriendsData() {
    const doc = await fetchUserDocument();
    const docs = await fetchAllUsers();
    let friendsdata = [];
    
    await docs.get().then((userDocs) => {
       userDocs.forEach((userDoc) => {
       // check if user is in friend list, if so, add data
       if (doc.data()["Friends"].includes(userDoc.id)) {
          friendsdata.push([userDoc.id,userDoc.data()["Name"], userDoc.data()["Age"], userDoc.data()["Profession"], userDoc.data()["Location"]]);
       
       }
       
       });
   });
    console.log(friendsdata);
   return friendsdata;
    }
    if (!friendsDataDoc) {
       getFriendsData().then(friends => setallFriendsData(friends));
 }

 async function getSuggestedFriends() {
  var suggestedFriendsTemp = []
  const doc = await fetchUserDocument();
  const docs = await fetchAllUsers();
  const userID = await getUserID();

  const maxDis = doc.data()["Preferences"]["MaxDistance"];
  const ageRange = doc.data()["Preferences"]["AgeRange"];

  await docs.get().then((userDocs) => {
      userDocs.forEach((userDoc) => {
      // check if user already in friend list, if so, skip
      if (doc.data()["Friends"].includes(userDoc.id)) {
          return;
      }
if (userDoc.id == userID) {
  return;
}
      var disDiff = getDistanceFromLatLonInKm(doc.data()["Location"]["u_"], doc.data()["Location"]["h_"],
                                              userDoc.data()["Location"]["u_"], userDoc.data()["Location"]["h_"]);

      if ((disDiff <= maxDis) && 
          ((userDoc.data()["Age"] >= ageRange[0]) && (userDoc.data()["Age"] <= ageRange[1]))) {
          suggestedFriendsTemp.push([userDoc.id, userDoc.data()["Name"], userDoc.data()["Age"], userDoc.data()["Profession"], userDoc.data()["Location"]]);
      }
      });
  });
console.log(suggestedFriendsTemp);
  return suggestedFriendsTemp;
}
if (!suggestedFriends) {
  getSuggestedFriends().then(suggested => setSuggestedFriends(suggested));
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

  async function handleAddFriend(value) {
		setError("");
		try {
			console.log("Adding friend.");
			console.log(value);
			await addFriend(value);
		} catch {
			setError("Error trying to add friend.");
		}
	}

  async function getUserData() {
    const doc = await fetchUserDocument();
    return doc;
  }
  if (!userDataDoc) {
    getUserData().then((doc) => setUserDataDoc(doc.data()));
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Wassup</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="chat-room"> Chat Room </Nav.Link>
            <Nav.Link href="/find-friends">Find Friends</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile-about">About</NavDropdown.Item>
              <NavDropdown.Item href="/profile-interests">
                Interests
              </NavDropdown.Item>
              <NavDropdown.Item href="/profile-preferences">
                Preferences
              </NavDropdown.Item>
              <NavDropdown.Item href="/profile-friends">
                Friends
              </NavDropdown.Item>
              <NavDropdown.Item href="/profile-events">Events</NavDropdown.Item>
              <NavDropdown.Item href="/profile-photos">Photos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/update-profile">
                Update Profile
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* <Form inline>
            <FormControl
              type="text"
              placeholder="Search Events"
              className="mr-md-4"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
      <div>
      <div class="row" style={{position: 'relative', top: '10%', left: '35%', align: 'center', size: '18px'}}>
          <img src={process.env.PUBLIC_URL + "Wassup2.png"} alt="WassUp Logo"></img>
        </div>
        <div class="row" style={{position: 'relative', top: '15%', left: '15%', align: 'center', color: 'rgb(173, 143, 125)', size: '18px'}}>
          <h4> Welcome to WassUp where you can connect to people with hobbies similar to you!</h4>
          <br/>
          <br/>
          <br/>
        </div>
        </div>
      <div class="main-wrapper pt-80">
            <div class="container" style={{top:'20%'}}>
                <div class="row">
                    <div class="col-lg-3 order-2 order-lg-1">
                        <aside class="widget-area">
                            {/* <!-- widget single item start --> */}
                            <div class="card card-profile widget-item p-0">
                                <div class="profile-banner">
                                    <div class="profile-desc text-center">
                                        <div class="author">
                                        {userDataDoc && (
                                            <div>
                                              <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Profile Picture"></img>
                                              <br/>
                                              <h4><a href="/profile-about"> {userDataDoc["Name"]}</a></h4>
                                              <h6>{currentUser.email}
                                              <br/>
                                              <strong>Age:</strong> {userDataDoc["Age"]} years
                                              <br/>
                                              <strong>Address:</strong> {userDataDoc["Address"]}
                                              <br/>
                                              <strong>Bio:</strong> {userDataDoc["Bio"]}
                                              <br/>
                                              </h6>
                                            </div>
                                           )}
                                          </div>
                                        </div>
                                </div>
                            </div>
                            {/* <!-- widget single item start --> */}
                        </aside>
                    </div>

                    <div class="col-lg-6 order-1 order-lg-2">
                      <div class="card card-small">
                            <div class="dashboard-events">
                                {/* <!-- profile picture end --> */}
                                <h2 style={{position: 'relative', left: '20%', top: '50%', color: 'rgb(102, 72, 54)'}}>Events You RSPV'd To </h2>
                            </div>
                        </div>
                        {/* <!-- post status start --> */}
                        <div class="card">
                            {/* <!-- post title start --> */}
                            <div class="post-title d-flex align-items-center">
                                {/* <!-- profile picture end --> */}
                                <div class="profile-thumb">
                                    <a href="#">
                                        <figure class="profile-thumb-middle">
                                            <img src="assets/images/profile/profile-small-1.jpg" alt="profile picture"/>
                                        </figure>
                                    </a>
                                </div>
                                {/* <!-- profile picture end --> */}

                                <div class="posted-author">
                                    <h6 class="author"><a href="profile.html">merry watson</a></h6>
                                    <span class="post-time">20 min ago</span>
                                </div>

                                <div class="post-settings-bar">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <div class="post-settings arrow-shape">
                                        <ul>
                                            <li><button>copy link to adda</button></li>
                                            <li><button>edit post</button></li>
                                            <li><button>embed adda</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- post title start --> */}
                            <div class="post-content">
                                <p class="post-desc">
                                    Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                                    default model text, and a search for 'lorem ipsum' will uncover many web sites still
                                    in their infancy.
                                </p>
                                <div class="post-thumb-gallery">
                                    <figure class="post-thumb img-popup">
                                        <a href="assets/images/post/post-large-1.jpg">
                                            <img src="assets/images/post/post-1.jpg" alt="post image"/>
                                        </a>
                                    </figure>
                                </div>
                                <div class="post-meta">
                                    <button class="post-meta-like">
                                        <i class="bi bi-heart-beat"></i>
                                        <span>You and 201 people like this</span>
                                        <strong>201</strong>
                                    </button>
                                    <ul class="comment-share-meta">
                                        <li>
                                            <button class="post-comment">
                                                <i class="bi bi-chat-bubble"></i>
                                                <span>41</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button class="post-share">
                                                <i class="bi bi-share"></i>
                                                <span>07</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- post status end --> */}

                        {/* <!-- post status start --> */}
                        <div class="card">
                            {/* <!-- post title start --> */}
                            <div class="post-title d-flex align-items-center">
                                {/* <!-- profile picture end --> */}
                                <div class="profile-thumb">
                                    <a href="#">
                                        <figure class="profile-thumb-middle">
                                            <img src="assets/images/profile/profile-small-9.jpg" alt="profile picture"/>
                                        </figure>
                                    </a>
                                </div>
                                {/* <!-- profile picture end --> */}

                                <div class="posted-author">
                                    <h6 class="author"><a href="profile.html">Jon Wileyam</a></h6>
                                    <span class="post-time">15 min ago</span>
                                </div>

                                <div class="post-settings-bar">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <div class="post-settings arrow-shape">
                                        <ul>
                                            <li><button>copy link to adda</button></li>
                                            <li><button>edit post</button></li>
                                            <li><button>embed adda</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- post title start --> */}
                            <div class="post-content">
                                <p class="post-desc pb-0">
                                    Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                                    default model text, and a search for
                                </p>
                                <div class="post-meta">
                                    <button class="post-meta-like">
                                        <i class="bi bi-heart-beat"></i>
                                        <span>You and 206 people like this</span>
                                        <strong>206</strong>
                                    </button>
                                    <ul class="comment-share-meta">
                                        <li>
                                            <button class="post-comment">
                                                <i class="bi bi-chat-bubble"></i>
                                                <span>41</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button class="post-share">
                                                <i class="bi bi-share"></i>
                                                <span>07</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- post status end --> */}
                      
                    </div>

                    <div class="col-lg-3 order-3">
                        <aside class="widget-area">
                            {/* <!-- widget single item start --> */}
                            <div class="card widget-item">
                                <h4 class="widget-title" style={{position: 'relative', left: '20%', top: '50%', color: 'rgb(102, 72, 54)'}}>Friends Zone</h4>
                                <div class="widget-body">
                                {friendsDataDoc && friendsDataDoc.map((friend) => (
                              <div key={friend[0]}>
                                 {/* <!-- begin row --> */}
                                 <div class="row row-space-2">
                                    {/* <!-- begin col-6 --> */}
                                    <div class="col-md-10 m-b-10">
                                       <div class="p-10 bg-white">
                                          <div class="media media-xs overflow-visible">
                                              <a class="media-left" href="javascript:;">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" class="media-object img-circle"/>
                                              </a>
                                             <div class="media-body valign-middle">
                                                <b class="text-inverse"> {friend[1]} </b>
                                                <br/><span class="text-inverse"> 
                                                {friend[3] && friend[3].map((value, index) => {
                                                return <span key={index}>{value}, </span>; })} </span>
                                                <br/><span class="text-inverse"> Age: {friend[2]} years</span>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 {/* <!-- end col-6 -->*/}
                              </div>
                           ))}
                                </div>
                            </div>
                            {/* <!-- widget single item end --> */}

                            <div class="card widget-item">
                                <div class="widget-body">
                              </div>
                            </div>

                            {/* <!-- widget single item start --> */}
                            <div class="card widget-item">
                                <h4 class="widget-title" style={{position: 'relative', left: '5%', top: '80%', color: 'rgb(102, 72, 54)'}}>Friends Suggestions</h4>
                                <div class="widget-body">
                                  {error && <Alert variant="danger">{error}</Alert>}
                                  <div className={classes.root}>
                                        {suggestedFriends && 
                                        <div>
                                            {suggestedFriends.map((friend =>
                                            <div>
                                                {friend && friend[1] &&
                                                <div class="row">
                                                    <div class="col-md-2 col-sm-2 media media-xs overflow-visible">
                                                      <a class="media-left" href="javascript:;">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" class="media-object img-circle"/>
                                                      </a>
                                                    </div>

                                                    <div class="col-md-4 col-sm-4">
                                                        <p key={friend[0]}> <a href="#" class="profile-link"> {friend[1]}</a>
                                                        <p>Age : {friend[2]}</p>
                                                        {/* <p>Profession : {friend[3]}</p> */}
                                                    </p>
                                                    </div>

                                                    <div class="col-md-3 col-sm-3">
                                                        <button class="btn btn-primary" onClick={() => {handleAddFriend(friend[0]);}}>Add Friend</button>
                                                    </div>
                                                </div>
                                                }
                                            </div>))} 
                                        </div>}
                                  </div>
                              </div>
                            </div>
                            {/* <!-- widget single item end --> */}
                        </aside>
                    </div>
                </div>
            </div>
        </div>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
