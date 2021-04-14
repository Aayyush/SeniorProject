import { Card, Form, Checkbox } from "react-bootstrap";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";

class GuestLabel extends React.Component {
  render() {
    return (
      <div>
        <li>
          {this.props.guests.map((guestName, i) => (
            <ol>{guestName}</ol>
          ))}
        </li>
      </div>
    );
  }
}

class GuestBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guestName: "",
      guests: [],
    };

    this.addGuest = this.addGuest.bind(this);
  }

  addGuest(newGuest) {
    const currentGuestList = this.state.guests;
    this.setState({
      guestName: "",
      guests: currentGuestList.concat([newGuest]),
    });
  }

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("do validate");
      this.addGuest(this.state.guestName);
    }
  };

  handleChange = (e) => {
    this.setState({ guestName: e.target.value, guests: this.state.guests });
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
        <label type="text">
          Guest Name
          <input
            value={this.state.guestName}
            onKeyDown={this._handleKeyDown}
            onChange={this.handleChange}
            ref="myinput"
          />
          <Autocomplete
            id="combo-box-demo"
            options={useAuth().getAllUsers()}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Combo box" variant="outlined" />
            )}
          />
          <GuestLabel guests={this.state.guests} />
        </label>
      </div>
    );
  }
}

async function handleSubmit(e) {}

export default function CreateEvent() {
  const eventNameRef = useRef();
  const descriptionRef = useRef();
  const openToPublicRef = useRef();

  const [eventDate, setEventDate] = useState(new Date());

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
        <Form.Group controlId="openToPublic">
          <Form.Check
            type="checkbox"
            label="Open to Public?"
            ref={openToPublicRef}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
