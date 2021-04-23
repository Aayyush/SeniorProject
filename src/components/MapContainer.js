import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import firebase from "firebase/app";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown } from "react-bootstrap";

firebase.app();

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    eventOnDisplay: {},
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
    events: [],
    searchValue: null,
    zoomLevel: 14,
  };

  componentDidMount() {
    async function fetchData() {
      var db = firebase.firestore();
      var events = [];
      await db
        .collection("Events")
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            // console.log(doc.data());
            var eventData = doc.data();
            eventData["id"] = doc.id;
            events.push(eventData);
            db.collection("Users")
              .doc(eventData.CreatedBy)
              .get()
              .then((userDoc) => {
                eventData["createdByName"] = userDoc.data().Name;
              });
          });
        });
      return events;
    }

    fetchData().then((events) => {
      this.setState({ events: events });
      console.log(events);
    });
  }

  rsvpUser() {
    // Get the current logged in user.
    const auth = firebase.auth();
    const db = firebase.firestore();
    const currUser = auth.currentUser;
    const event = this.state.eventOnDisplay;

    // Add the event to the user's attending field.
    db.collection("Users")
      .doc(currUser.uid)
      .update({
        EventsAttending: firebase.firestore.FieldValue.arrayUnion(event.id),
      })
      .then(() => {
        console.log("Added to eventsAttending");

        // Add the user to the guests list.
        db.collection("Events")
          .doc(event.id)
          .update({
            Guests: firebase.firestore.FieldValue.arrayUnion({
              IsAccepted: true,
              UID: currUser.uid,
            }),
          })
          .then(() => {
            console.log("Added user to the event's guest list.");
          });
      });
  }

  handleChange = (_, newValue) => {
    if (!newValue) return;

    // Zoom into searched Event
    this.setState({
      zoomLevel: 17,
    });

    // Retrieve the event with that name and focus on that event.
    this.setState({
      searchValue: newValue,
    });

    // TODO: Open Info window.
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      eventOnDisplay: this.state.events[Number(props.name)],
    });
    console.log(this.state);
  };

  onClose = (_) => {
    if (this.state.showingInfoWindow) {
      // Hack: Button on click not working.
      // RSVP User.
      this.rsvpUser();

      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        eventOnDisplay: null,
        zoomLevel: 14,
      });
    }
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
              <Nav.Link href="/events" active>
                Events
              </Nav.Link>
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
          options={this.state.events}
          getOptionLabel={(event) => event.Name}
          style={{ width: 700 }}
          renderInput={(params) => (
            <TextField {...params} label="Event Name" variant="outlined" />
          )}
          value={this.state.searchValue}
          onChange={this.handleChange}
        />
        <Map
          google={this.props.google}
          zoom={this.state.zoomLevel}
          style={mapStyles}
          initialCenter={{
            lat: 38.9183555,
            lng: -77.04049549999999,
          }}
          center={{
            lat: this.state.searchValue?.Location.lat,
            lng: this.state.searchValue?.Location.lng,
          }}
        >
          {this.state.events &&
            this.state.events.map((event, i) => (
              <Marker
                position={{ lat: event.Location.lat, lng: event.Location.lng }}
                onClick={this.onMarkerClick}
                onMouseover={this.onMouseOverMarker}
                name={i}
                key={i}
              />
            ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.eventOnDisplay?.Name}</h4>
              <h6>{this.state.eventOnDisplay?.Description}</h6>
              <h6>
                {new Date(
                  this.state.eventOnDisplay?.Date?.seconds * 1000
                ).toDateString()}
              </h6>
              <h6>Created By: {this.state.eventOnDisplay?.createdByName}</h6>
              <h6>Duration {this.state.eventOnDisplay?.Duration}</h6>
              <h6>Attendance {this.state.eventOnDisplay?.Attendance}</h6>
              <button
                type="submit"
                onClick={(event) => {
                  console.log(event);
                }}
              >
                RSVP
              </button>
              {/* TODO: Add RSVP logic to button. */}
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCjnQ8RAq7v8WrfNSaMqD8LjiFSvpDzXRc",
})(MapContainer);
