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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Age Range</h2>
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
