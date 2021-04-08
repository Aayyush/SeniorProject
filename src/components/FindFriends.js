import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import app from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import firebase from "firebase/app"
import 'firebase/firestore'
import { auth, firestore } from "../firebase"
import "./Profile.css"

const useStyles = makeStyles({
  root: {
    width: 300,
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
    const {logout, fetchAllUsers, fetchUserDocument } = useAuth();
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

        const maxDis = 100; //doc.data()["Preferences"]["MaxDistance"];
        const ageRange = doc.data()["Preferences"]["AgeRange"];

        await docs.get().then((userDocs) => {
            userDocs.forEach((userDoc) => {
            // check if user already in friend list, if so, skip
            if (doc.data()["Friends"].includes(userDoc.id)) {
                return;
            }
            var disDiff = getDistanceFromLatLonInKm(doc.data()["Location"]["u_"], doc.data()["Location"]["h_"],
                                                    userDoc.data()["Location"]["u_"], userDoc.data()["Location"]["h_"]);

            if ((disDiff <= maxDis) && 
                ((userDoc.data()["Age"] >= ageRange[0]) && (userDoc.data()["Age"] <= ageRange[1]))) {
                suggestedFriendsTemp.push([userDoc.id, userDoc.data()["Name"], userDoc.data()["Age"]], userDoc.data()["Profession"], userDoc.data()["Location"]);
            }
            });
        });
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
                            
                         <li class="nav-item"><Link to="/profile-events" class="nav-link" data-toggle="tab">EVENTS</Link>
                            
                         </li>
                         <li class="nav-item"><Link to="/profile" class="nav-link  active show" data-toggle="tab">FRIENDS</Link>
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
                                        <button class="btn btn-primary pull-right">Add Friend</button>
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
