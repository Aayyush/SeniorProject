import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import app from "../firebase"
import firebase from "firebase/app"
import 'firebase/firestore'
import { auth } from "../firebase"

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function UpdateAgeRange() {
  const [error, setError] = useState("")
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 100]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [currValue = fetchAgeRange(), setCurrValue] = React.useState();
  
  
  function handleUpdate(value) {
	  window.alert(`The age range has been updated to ${value[0]} - ${value[1]}`);
	  var db = firebase.firestore(app);
	  db.collection('Users').doc(auth.currentUser.uid).update({
		  Preferences: {
			  AgeRange: [value[0], value[1]]
		} 
	  });
	  setCurrValue(value);
  }
  
  function fetchAgeRange() {
	  var db = firebase.firestore(app);
	  db.collection('Users').doc(auth.currentUser.uid).get().then((doc) => {
		  if (doc.exists) {
			  setCurrValue(doc.data()["Preferences"]["AgeRange"]);
		  } else {
			  console.log("Document does not exist");
		  }
	  }).catch((error) => {
		  console.log("Error fetching document:", error);
	  })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Age Range</h2>
		  {currValue ? 
		  <h2 className="text-center mb-4">Current age range set to : {currValue[0]} - {currValue[1]}</h2>
		  : null}
          {error && <Alert variant="danger">{error}</Alert>}
            <div className={classes.root}>
			<Typography id="range-slider" gutterBottom>
				Select age range
			</Typography>
			<Slider
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				getAriaValueText={valuetext}
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
    </>
  )
}
