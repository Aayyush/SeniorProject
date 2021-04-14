import { Card, Form, Checkbox } from "react-bootstrap";
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
            <li>{guestName}</li>
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
      value: this.top100Films[0],
    };
  }

  handleChange = (event, newValue) => {
    if (!newValue) return;

    const currentGuestList = this.state.guests;
    this.setState({
      value: "",
      guests: currentGuestList.concat([newValue.title]),
    });
  };

  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    { title: "The Lord of the Rings: The Return of the King", year: 2003 },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
  ];

  render() {
    return (
      <div>
        <Autocomplete
          id="combo-box-demo"
          options={this.top100Films}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Guest Name" variant="outlined" />
          )}
          value={this.state.value}
          onChange={this.handleChange}
          ref="myinput"
        />
        <label>Guests</label>
        <GuestLabel guests={this.state.guests} />
      </div>
    );
  }
}

export default function CreateEvent() {
  const eventNameRef = useRef();
  const descriptionRef = useRef();
  const openToPublicRef = useRef();

  const [eventDate, setEventDate] = useState(new Date());
  const [eventLocation, setEventLocation] = useState(null);
  const [usersList, setUsersList] = useState([]);

  const { fetchAllUsers } = useAuth();

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching users");
      const snapshot = await fetchAllUsers().get();
      return snapshot.docs.map((doc) => doc.data());
    }
    var x = fetchData();
    console.log(x);
    // console.log(usersList);
  }, [fetchAllUsers]);

  async function handleSubmit(e) {}

  function handleLocationSearchBoxCallback(eventLocation) {
    setEventLocation(eventLocation);
    console.log("Parent");
    console.log(eventLocation);
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Create New Event</h2>
        <Form onSubmit={handleSubmit}></Form>
        <Form.Group id="event-name">
          <Form.Label>Event Name</Form.Label>
          <Form.Control type="text" ref={eventNameRef} required />
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
          />
        </Form.Group>
        <Form.Group>
          <TextField
            id="time"
            label="Start Time"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <TextField
            id="time"
            label="End Time"
            type="time"
            defaultValue="08:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </Form.Group>
        <Form.Group>
          <label>Location</label>
          <LocationSearchBox parentCallback={handleLocationSearchBoxCallback} />
        </Form.Group>
        <Form.Group controlId="openToPublic">
          <Form.Check
            type="checkbox"
            label="Open to Public?"
            ref={openToPublicRef}
          />
        </Form.Group>
        <Form.Group>
          <GuestBox />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
