import { Button, Card, Form } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import LocationSearchBox from "./LocationSearchBox";

import { useAuth } from "../contexts/AuthContext";

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

  const { fetchAllUsers, currentUser, createNewEvent, getDB } = useAuth();

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

      const newEvent = {
        Name: eventName,
        Description: descriptionRef.current.value,
        Date: eventDate,
        Duration: durationRef.current.value,
        Location: eventLocation.terms,
        OpenToPublic: openToPublicRef.current.value === "on" ? true : false,
        Guests: guests,
        CreatedBy: currentUser.uid,
      };

      createNewEvent(newEvent).then((_) => {
        console.log("Event Created");

        // TODO: Add this event to user's list.

        // TODO: Invite all users to the event.
      });
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
