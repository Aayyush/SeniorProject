import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function UpdateAgeRange() {
  const rangeRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  function handleUpdate(value) {
	  window.alert(value);
	  console.log('asdf');
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
