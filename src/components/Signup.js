import React, { useRef, useState } from "react"
import { Col, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import RangeSlider from "react-bootstrap-range-slider"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePosition } from 'use-position';
import firebase from "firebase/app"
import Geocode from "react-geocode";

export default function Signup() {
  
  // References for form fields
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const bioRef = useRef() 
  const interestsRef = useRef()
  const nameRef = useRef()
  

  const { signup, addUserDocuments } = useAuth()
  
  // Location fields
  const {
    latitude,
    longitude,
  } = usePosition();

  // States for sliders
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [minAgePreference, setMinAgePreference] = useState(18)
  const [maxAgePreference, setMaxAgePreference] = useState(35)
  const [maxDistancePreference, setMaxDistancePreference] = useState(50) // in miles
  const [dateOfBirth, setDateOfBirth] = useState(new Date())

  const history = useHistory()

  // Helper method to calculate user age.
  const calculate_age = (dateOfBirth) => {
    var today = new Date();
    var birthDate = new Date(dateOfBirth); 
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
      age_now--;
    }
    return age_now;
  }

  // Geocode Configurations 
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");
  Geocode.setApiKey("AIzaSyCjnQ8RAq7v8WrfNSaMqD8LjiFSvpDzXRc");

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)

      // Get formatted address from geolocation.
      const address = await Geocode.fromLatLng(latitude, longitude).then(
        (response) => {
          const address = response.results[0].formatted_address;
          return address
        }, error => {
          console.log(error)
        });

      // Store Form fields.
      const userProfile = {
        Name : nameRef.current.value,
        Age: calculate_age(dateOfBirth),
        Address: address,
        Location: new firebase.firestore.GeoPoint(latitude, longitude),
        ProfilePic: '', // TODO: Add logic to upload profile picture.
        Bio: bioRef.current.value,
        Friends: [],
        Hobbies: interestsRef.current.value.split(','),
        Preferences: {
          AgeRange: [minAgePreference, maxAgePreference],
		  MaxDistance: maxDistancePreference
        }, 
        Events: {}
      }

      // Sign Up User
      signup(emailRef.current.value, passwordRef.current.value)
      .then(_ => {
        console.log("User Successfully signed up.")

        // Only add User Profile to firestore after User is signed up.
        addUserDocuments(userProfile)
        .then(_ => {
          console.log("User Profile Information Stored.")
        })
      })
	    history.push("/")
    } catch {
      setError("Failed to create an account")
    }
	
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="age-preference-min">
              <Form.Label>Min Age Preference</Form.Label>
                <RangeSlider
                  value={minAgePreference}
                  onChange={e => setMinAgePreference(e.target.value)}
                />
            </Form.Group>
            <Form.Group id="age-preference-max">
              <Form.Label>Max Age Preference</Form.Label>
                <RangeSlider
                  value={maxAgePreference}
                  onChange={e => setMaxAgePreference(e.target.value)}
                />
            </Form.Group>
            <Form.Group id="distance-preference-max">
              <Form.Label>Max distance (miles) to events preference</Form.Label>
                <RangeSlider
                  value={maxDistancePreference}
                  onChange={e => setMaxDistancePreference(e.target.value)}
                />
            </Form.Group>
            <Form.Group id="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control type="text" ref={bioRef} required />
            </Form.Group>
            <Form.Group id="date-of-birth">
              <Form.Label>Date Of Birth</Form.Label>
                <DatePicker
                  selected={dateOfBirth}
                  onChange={date => setDateOfBirth(date)}
                />
            </Form.Group>
            <Form.Group id="interests">
              <Form.Label>Interests (Comma Separated)</Form.Label>
              <Form.Control type="text" ref={interestsRef} required />
            </Form.Group>
            <Form.Group id="user-location">
              <Form.Label>User Location <b>{latitude} {longitude}</b></Form.Label>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
