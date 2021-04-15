import React, { useRef, useState } from "react"
import { Card, Button, Alert, Nav, NavDropdown, Form, FormControl } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import app from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import firebase from "firebase/app"
import 'firebase/firestore'
import { auth, firestore } from "../firebase"
import "./Profile.css"
import Navbar from 'react-bootstrap/Navbar'

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

export default function FindFriends() {
    const [userDataDoc, setUserDataDoc] = useState("");
    const [suggestedFriends, setSuggestedFriends] = useState("");
    const {logout, fetchAllUsers, fetchUserDocument, addFriend, getUserID } = useAuth();
    const history = useHistory();
    const [error, setError] = useState("");
    const classes = useStyles();

    async function getUserData() {
        const doc = await fetchUserDocument();
        return doc;
        }
     if (!userDataDoc) {
           getUserData().then(doc => setUserDataDoc(doc.data()));
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
        setError("")
    
        try {
        await logout()
        history.push("/login")
        } catch {
        setError("Failed to log out")
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
                        <Nav.Link href="/find-friends" active>Find Friends</Nav.Link>
                        <Nav.Link href="/chat-room"> Chat Room </Nav.Link>
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
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
                
                {/* <!-- end navbar -->
                <!-- begin profile-content --> */}
            <div class="profile-content">
              {/* <!-- begin tab-content --> */}
              <div class="tab-content p-0">
                 {/* <!-- begin #profile-friends tab --> */}
                 <div class="tab-pane fade in active show" id="profile-friends">
                 <h4 class="m-t-0 m-b-20">
                    <ul class="profile-header-tab nav nav-tabs">
                        <li class="nav-item"> 
                            Suggested Friends
                        </li>
                       </ul>
                     </h4>
                 <div class="people-nearby">
              {/* <div class="google-maps">
                <div id="map" class="map" style="position: relative; overflow: hidden;"><div style="height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; background-color: rgb(229, 227, 223);"><div class="gm-err-container"><div class="gm-err-content"><div class="gm-err-icon"><img src="https://maps.gstatic.com/mapfiles/api-3/images/icon_error.png" draggable="false" style="user-select: none;"></img></div><div class="gm-err-title">Oops! Something went wrong.</div><div class="gm-err-message">This page didn't load Google Maps correctly. See the JavaScript console for technical details.</div></div></div></div></div>
              </div> */}
              <div class="nearby-user">
              {error && <Alert variant="danger">{error}</Alert>}
                  <div className={classes.root}>
                        {suggestedFriends && 
                        <div>
                            {suggestedFriends.map((friend =>
                             <div>
                                {friend && friend[1] &&
                                <div class="row">
                                    <div class="col-md-2 col-sm-2">
                                        <img src="images/users/user-15.jpg" alt="user" class="profile-photo-lg"></img>
                                    </div>

                                    <div class="col-md-7 col-sm-7">
                                        <p key={friend[0]}> <a href="#" class="profile-link"> {friend[1]}</a>
                                        <p>Age : {friend[2]}</p>
                                        {/* <p>Profession : {friend[3]}</p> */}
                                    </p>
                                    </div>

                                    <div class="col-md-3 col-sm-3">
                                        <button class="btn btn-primary pull-right" onClick={() => {handleAddFriend(friend[0]);}}>Add Friend</button>
                                    </div>
                                </div>
                                }
                            </div>))} 
                        </div>}
                  </div>
              </div>
            </div>
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
