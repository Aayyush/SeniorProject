import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const [userDataDoc, setUserDataDoc] = useState("")
  const { currentUser, logout, fetchUserDocument } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  async function getUserData() {
	  const doc = await fetchUserDocument();
	  return doc;
  }
  if (!userDataDoc) {
	  getUserData().then(doc => setUserDataDoc(doc.data()));
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Home</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          { userDataDoc &&
		  <div>
		  <strong>Profile pic:</strong> {userDataDoc["ProfilePic"]}
          <br/>
		  <strong>Email:</strong> {currentUser.email}
		  <br/>
		  <strong>Name:</strong> {userDataDoc["Name"]}
		  <br/>
		  <strong>Age:</strong> {userDataDoc["Age"]}
		  <br/>
		  <strong>Address:</strong> {userDataDoc["Address"]}
		  <br/>
		  <strong>Bio:</strong> {userDataDoc["Bio"]}
		  <br/>
		  </div>
		  }
          <Link to="/profile" className="btn btn-primary w-100 mt-3">
            Profile
            </Link>
		  <Link to="/update-preferences" className="btn btn-primary w-100 mt-3">
            Update Preferences
          </Link>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}
