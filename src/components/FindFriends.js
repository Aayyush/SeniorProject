import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import app from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import firebase from "firebase/app"
import 'firebase/firestore'
import { auth, firestore } from "../firebase"

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
  const [suggestedFriends, setSuggestedFriends] = useState("")
  const {fetchAllUsers, fetchUserDocument } = useAuth()
  const [error, setError] = useState("")
  const classes = useStyles();
  
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
				 suggestedFriendsTemp.push([userDoc.id, userDoc.data()["Name"], userDoc.data()["Age"]]);
			 }
		  });
	  });
	  return suggestedFriendsTemp;
  }
  if (!suggestedFriends) {
	  getSuggestedFriends().then(suggested => setSuggestedFriends(suggested));
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Suggested Friends</h2>
          {error && <Alert variant="danger">{error}</Alert>}
            <div className={classes.root}>
				{suggestedFriends && 
				<div> 
				{suggestedFriends.map((friend =>
					<div>
					<p key={friend[0]}> Name : {friend[1]} <br/> Age : {friend[2]} <br/>
						PUT BUTTON TO ADD FRIEND HERE
					</p>
					</div>
				))} 
				</div>}
			</div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}
