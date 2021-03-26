import React, { useRef, useState } from "react"
import { Col, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import RangeSlider from "react-bootstrap-range-slider"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePosition } from 'use-position';

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const bioRef = useRef() 
  const interestsRef = useRef()
  const nameRef = useRef()
  

  const { signup } = useAuth()
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
  } = usePosition();

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [minAgePreference, setMinAgePreference] = useState(18)
  const [maxAgePreference, setMaxAgePreference] = useState(35)
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  
  const [coordinate, setCoordinate] = useState({
    lat:0,
    long:0
  });
  let geoId;

  function handleSubmitUserLocation(e) {
    e.preventDefault()
    
    geoId=window.navigator.geolocation.watchPosition(position=>{
      setCoordinate({
        lat:position.coords.latitude,
        long:position.coords.longitude
      });
    })
  }


  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
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
