import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import app from "../firebase"
import firebase from "firebase/app"
import 'firebase/firestore'
import { auth } from "../firebase"
import { useAuth } from "../contexts/AuthContext"

const useStyles = makeStyles({
  root: {
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function UpdatePreferences() {
  const [userDataDoc, setUserDataDoc] = useState("")
  const [error, setError] = useState("")
  const classes = useStyles();
  const {fetchUserDocument } = useAuth();
  const [value, setValue] = React.useState([0, 100]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getUserData() {
	  const doc = await fetchUserDocument();
	  return doc;
  }
  if (!userDataDoc) {
	  getUserData().then(doc => setUserDataDoc(doc.data()));
  }
  
  function handleUpdate(value) {
	  window.alert(`The age range has been updated to ${value[0]} - ${value[1]}`);
	  var db = firebase.firestore(app);
	  db.collection('Users').doc(auth.currentUser.uid).update({
		  Preferences: {
			  AgeRange: [value[0], value[1]]
		} 
	  });
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
                        <Link to="/update-profile-interests" class="nav-link" data-toggle="tab">INTERESTS</Link></li>
                    <li class="nav-item"><Link to="/update-preferences" class="nav-link  active show" data-toggle="tab">PREFERENCES</Link>
                     </li> 
                     <li class="nav-item"><Link to="/update-profile-events" class="nav-link" data-toggle="tab">EVENTS</Link>
                     </li>
                     
                  </ul>
                  {/* <!-- END profile-header-tab --> */}
                  </div>
            </div>
            {/* <!-- end profile -->
            <!-- begin profile-content -->*/}
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Age Range</h2>
          {error && <Alert variant="danger">{error}</Alert>}
            <div className={classes.root}>
			<Typography id="range-slider" gutterBottom>
				<h4 className= "text-center"> Select age range </h4>
			</Typography>
			<Slider
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				getAriaValueText={valuetext}
        width="100%"
			/>
			</div>
            <Button className="w-100" onClick={() => {handleUpdate(value);}}>
              Update
            </Button>
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
