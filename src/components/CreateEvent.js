import { Button, Card, Form } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import LocationSearchBox from "./LocationSearchBox";

import { useAuth } from "../contexts/AuthContext";

import Geocode from "react-geocode";
import { useHistory } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

// Geocode Configurations
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.setApiKey("AIzaSyCjnQ8RAq7v8WrfNSaMqD8LjiFSvpDzXRc");
class GuestLabel extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.guests.map((guestName, i) => (
            <li key={i}>{guestName}</li>
          ))}
        </ul>
      </div>
    );
  }
}

class GuestBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: [],
      value: null,
    };
  }

  handleChange = (event, newValue) => {
    if (!newValue) return;

    const currentGuestList = this.state.guests;
    this.setState({
      value: "",
      guests: currentGuestList.concat([newValue.Name]),
    });
    this.props.onAddGuestCallback(this.state.guests);
  };

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Wassup</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/events" active>Events</Nav.Link>
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
                <NavDropdown.Item href="/profile-events">
                  Events
                </NavDropdown.Item>
                <NavDropdown.Item href="/profile-photos">
                  Photos
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/update-profile">
                  Update Profile
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Autocomplete
          id="combo-box-demo"
          options={this.props.users}
          getOptionLabel={(option) => option.Name}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Guest Name" variant="outlined" />
          )}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <label>Guests</label>
        <GuestLabel guests={this.state.guests} />
      </div>
    );
  }
}

export default function CreateEvent() {
  const descriptionRef = useRef();
  const openToPublicRef = useRef();
  const durationRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [eventDate, setEventDate] = useState(new Date());
  const [eventLocation, setEventLocation] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [guestsList, setGuestsList] = useState([]);
  const [eventName, setEventName] = useState();

  const history = useHistory();

  const { fetchAllUsers, currentUser, createNewEvent } = useAuth();

  useEffect(() => {
    async function fetchData() {
      var users = [];
      await fetchAllUsers()
        .get()
        .then((userDocs) => {
          userDocs.forEach((userDoc) => {
            users.push(userDoc.data());
          });
        });
      return users;
    }

    fetchData().then((users) => {
      setUsersList(users);
    });
  }, [fetchAllUsers]);

  async function handleSubmit(e) {
    e.preventDefault();

    var duration = Number(durationRef.current.value);
    if (duration === "Nan") {
      return setError("Duration is not a number");
    } else if (duration < 0 || duration > 24) {
      return setError("Duration needs to be in the range of 0-24");
    }

    try {
      setError("");
      setLoading(true);

      var guests = [];
      guestsList.forEach((guestName) => {
        var userObj = {};
        userObj["Name"] = guestName;
        userObj["IsAccepted"] = false;
        guests.push(userObj);
      });

      var location = await Geocode.fromAddress(eventLocation.description).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          return {
            lat: lat,
            lng: lng,
          };
        },
        (error) => {
          console.error(error);
        }
      );

      const newEvent = {
        Name: eventName,
        Description: descriptionRef.current.value,
        Date: eventDate,
        Duration: durationRef.current.value,
        Location: location,
        OpenToPublic: openToPublicRef.current.value === "on" ? true : false,
        Guests: guests,
        CreatedBy: currentUser.uid,
        Attendance: 1, // Admin User
      };

      createNewEvent(newEvent).then((_) => {
        console.log("Event Created");

        // TODO: Add this event to user's list.

        // TODO: Invite all users to the event.
      });
      history.push("/events");
    } catch (err) {
      setError("Failed to create an account");
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Create New Event</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="event-name">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              value={eventName}
              onChange={(event) => {
                setEventName(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group id="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" ref={descriptionRef} required />
          </Form.Group>
          <Form.Group id="event-date">
            <Form.Label>Event Date</Form.Label>
            <DatePicker
              selected={eventDate}
              onChange={(date) => setEventDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
            <Form.Group>
              <label>Duration</label>
              <Form.Control type="text" ref={durationRef} required />
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <label>Location</label>
            <LocationSearchBox
              parentCallback={(eventLocation) =>
                setEventLocation(eventLocation)
              }
            />
          </Form.Group>
          <Form.Group controlId="openToPublic">
            <Form.Check
              type="checkbox"
              label="Open to Public?"
              ref={openToPublicRef}
              defaultValue="off"
            />
          </Form.Group>
          <Form.Group>
            <GuestBox
              users={usersList}
              onAddGuestCallback={(guestList) => setGuestsList(guestList)}
            />
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
