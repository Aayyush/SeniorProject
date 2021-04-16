import React, { useState } from "react";
import { Card, Button, Alert, Nav, NavDropdown } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [userDataDoc, setUserDataDoc] = useState("");
  const { currentUser, logout, fetchUserDocument } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  async function getUserData() {
    const doc = await fetchUserDocument();
    return doc;
  }
  if (!userDataDoc) {
    getUserData().then((doc) => setUserDataDoc(doc.data()));
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Wassup</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="chat-room"> Chat Room </Nav.Link>
            <Nav.Link href="/find-friends">Find Friends</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile-about">About</NavDropdown.Item>
              <NavDropdown.Item href="/profile-interests">
                Interests
              </NavDropdown.Item>
              <NavDropdown.Item href="/profile-preferences">
                Preferences
              </NavDropdown.Item>
              <NavDropdown.Item href="/profile-friends">
                Friends
              </NavDropdown.Item>
              <NavDropdown.Item href="/profile-events">Events</NavDropdown.Item>
              <NavDropdown.Item href="/profile-photos">Photos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/update-profile">
                Update Profile
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* <Form inline>
            <FormControl
              type="text"
              placeholder="Search Events"
              className="mr-md-4"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Home</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {userDataDoc && (
            <div>
              <strong>Profile pic:</strong> {userDataDoc["ProfilePic"]}
              <br />
              <strong>Email:</strong> {currentUser.email}
              <br />
              <strong>Name:</strong> {userDataDoc["Name"]}
              <br />
              <strong>Age:</strong> {userDataDoc["Age"]}
              <br />
              <strong>Address:</strong> {userDataDoc["Address"]}
              <br />
              <strong>Bio:</strong> {userDataDoc["Bio"]}
              <br />
            </div>
          )}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
