import React, { useState } from "react";
import {
  Card,
  Button,
  Alert,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import "./Profile.css";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCjnQ8RAq7v8WrfNSaMqD8LjiFSvpDzXRc");
Geocode.setLanguage("en");

const useStyles = makeStyles({
  root: {},
});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default function Dashboard() {
  const [error, setError] = useState("");
  const classes = useStyles();
  const [userDataDoc, setUserDataDoc] = useState("");
  const [suggestedFriends, setSuggestedFriends] = useState("");
  const {
    currentUser,
    logout,
    fetchUserDocument,
    fetchUserDocumentById,
    fetchAllUsers,
    getUserID,
    addFriend,
    fetchEventWithID,
  } = useAuth();
  const history = useHistory();

  const [friendsDataDoc, setallFriendsData] = useState("");

  async function getFriendsData() {
    const doc = await fetchUserDocument();
    const docs = await fetchAllUsers();
    let friendsdata = [];

    await docs.get().then((userDocs) => {
      userDocs.forEach((userDoc) => {
        // check if user is in friend list, if so, add data
        if (doc.data()["Friends"].includes(userDoc.id)) {
          friendsdata.push([
            userDoc.id,
            userDoc.data()["Name"],
            userDoc.data()["Age"],
            userDoc.data()["Profession"],
            userDoc.data()["Location"],
          ]);
        }
      });
    });
    console.log(friendsdata);
    return friendsdata;
  }
  if (!friendsDataDoc) {
    getFriendsData().then((friends) => setallFriendsData(friends));
  }

  async function getSuggestedFriends() {
    var suggestedFriendsTemp = [];
    const doc = await fetchUserDocument();
    const docs = await fetchAllUsers();
    const userID = await getUserID();

    const maxDis = doc.data()["Preferences"]["MaxDistance"];
    const ageRange = doc.data()["Preferences"]["AgeRange"];

    await docs.get().then((userDocs) => {
      userDocs.forEach((userDoc) => {
        // check if user already in friend list, if so, skip
        if (doc.data()["Friends"].includes(userDoc.id)) {
          return;
        }
        if (userDoc.id == userID) {
          return;
        }
        var disDiff = getDistanceFromLatLonInKm(
          doc.data()["Location"]["u_"],
          doc.data()["Location"]["h_"],
          userDoc.data()["Location"]["u_"],
          userDoc.data()["Location"]["h_"]
        );

        if (
          disDiff <= maxDis &&
          userDoc.data()["Age"] >= ageRange[0] &&
          userDoc.data()["Age"] <= ageRange[1]
        ) {
          suggestedFriendsTemp.push([
            userDoc.id,
            userDoc.data()["Name"],
            userDoc.data()["Age"],
            userDoc.data()["Profession"],
            userDoc.data()["Location"],
          ]);
        }
      });
    });
    console.log(suggestedFriendsTemp);
    return suggestedFriendsTemp;
  }
  if (!suggestedFriends) {
    getSuggestedFriends().then((suggested) => setSuggestedFriends(suggested));
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  async function handleAddFriend(value) {
    setError("");
    try {
      console.log("Adding friend.");
      console.log(value);
      await addFriend(value);

      window.location.reload();
    } catch {
      setError("Error trying to add friend.");
    }
  }

  async function getAddress(lat, lng) {
    Geocode.fromLatLng(lat, lng).then((response) => {
      return response.results[0].formatted_address;
    });
  }

  async function getUserData() {
    const doc = await fetchUserDocument();
    return doc;
  }

  async function fetchEvents(eventIds) {
    var events = [];
    eventIds.forEach((event) => {
      fetchEventWithID(event).then((event) => {
        var ev = event.data();
        fetchUserDocumentById(ev.CreatedBy).then((userDoc) => {
          ev["CreatedBy"] = userDoc.data()["Name"];
          getAddress(ev.Location.lat, ev.Location.lng).then((address) => {
            ev["Address"] = address;
            events.push(ev);
          });

          // Update Location object.
        });
      });
    });
    return events;
  }

  if (!userDataDoc) {
    console.log("User Data Fetch ");
    getUserData().then((doc) => {
      var userData = doc.data();
      const eventIDs = userData["EventsAttending"];

      fetchEvents(eventIDs).then((events) => {
        userData["EventsAttending"] = events;

        console.log(userData);
        setUserDataDoc(userData);
      });
    });
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Wassup</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/" active>
              Home
            </Nav.Link>
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
      <div>
        <div
          class="row"
          style={{
            position: "relative",
            top: "10%",
            left: "35%",
            align: "center",
            size: "18px",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "Wassup2.png"}
            alt="WassUp Logo"
          ></img>
        </div>
        <div
          class="row"
          style={{
            position: "relative",
            top: "15%",
            left: "15%",
            align: "center",
            color: "rgb(173, 143, 125)",
            size: "18px",
          }}
        >
          <h4>
            {" "}
            Welcome to WassUp where you can connect to people with hobbies
            similar to you!
          </h4>
          <br />
          <br />
          <br />
        </div>
      </div>
      <div class="main-wrapper pt-80">
        <div class="container" style={{ top: "20%" }}>
          <div class="row">
            <div class="col-lg-3 order-2 order-lg-1">
              <aside class="widget-area">
                {/* <!-- widget single item start --> */}
                <div class="card card-profile widget-item p-0">
                  <div class="profile-banner">
                    <div class="profile-desc text-center">
                      <div class="author">
                        {userDataDoc && (
                          <div>
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar5.png"
                              alt="Profile Picture"
                            ></img>
                            <br />
                            <h4>
                              <a href="/profile-about">
                                {" "}
                                {userDataDoc["Name"]}
                              </a>
                            </h4>
                            <h6>
                              {currentUser.email}
                              <br />
                              <strong>Age:</strong> {userDataDoc["Age"]} years
                              <br />
                              <strong>Address:</strong> {userDataDoc["Address"]}
                              <br />
                              <strong>Bio:</strong> {userDataDoc["Bio"]}
                              <br />
                            </h6>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- widget single item start --> */}
              </aside>
            </div>

            <div class="col-lg-6 order-1 order-lg-2">
              <div class="card card-small">
                <div class="dashboard-events">
                  {/* <!-- profile picture end --> */}
                  <h2
                    style={{
                      position: "relative",
                      left: "20%",
                      top: "50%",
                      color: "rgb(102, 72, 54)",
                    }}
                  >
                    Events You RSPV'd To{" "}
                  </h2>
                </div>
              </div>
              <div>
                {userDataDoc.EventsAttending &&
                  userDataDoc.EventsAttending.map((event, i) => (
                    <div class="card">
                      {/* <!-- event title start --> */}
                      <div class="post-title d-flex align-items-center">
                        {/* <!-- profile picture end --> */}
                        <div class="profile-thumb media media-xs overflow-visible">
                          <a href="#">
                            <figure class="profile-thumb-middle">
                              <img
                                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                alt="profile picture"
                                class="media-object img-circle"
                              />
                            </figure>
                          </a>
                        </div>
                        {/* <!-- profile picture end --> */}
                        <div class="posted-author">
                          <h6 class="event-name">
                            <a href="/events"> {event.Name} </a>
                          </h6>
                          {/* <span class="post-time">20 min ago</span> */}
                        </div>
                      </div>
                      {/* <!-- event title start --> */}
                      <div class="post-content">
                        <p class="post-desc">{event.Description}</p>
                        <ul class="comment-share-meta">
                          <h6 class="date">
                            {" "}
                            <span>
                              {" "}
                              Date:{" "}
                              {new Date(
                                event.Date.seconds * 1000
                              ).toDateString()}
                            </span>{" "}
                            <span> Duration: {event.Duration} </span>{" "}
                          </h6>
                          <h6 class="location">
                            {" "}
                            Location: 2225 Georgia Ave NW Washington DC
                          </h6>
                          <h6 class="author">
                            {" "}
                            Posted by:
                            <a href="/profile-name"> {event.CreatedBy}</a>
                          </h6>
                          <h6 class="location">
                            {" "}
                            RSVP'd: <strong> {event.Guests.length} </strong>
                          </h6>
                        </ul>
                        <button
                          class="post-meta-rsvp-count button1 button2"
                          style={{ textAlign: "center" }}
                        >
                          <i class="bi bi-heart-beat"></i>
                          <span>Guests</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div class="col-lg-3 order-3">
              <aside class="widget-area">
                {/* <!-- widget single item start --> */}
                <div class="card widget-item">
                  <h4
                    class="widget-title"
                    style={{
                      position: "relative",
                      left: "20%",
                      top: "50%",
                      color: "rgb(102, 72, 54)",
                    }}
                  >
                    Friends Zone
                  </h4>
                  <div class="widget-body">
                    {friendsDataDoc &&
                      friendsDataDoc.map((friend) => (
                        <div key={friend[0]}>
                          {/* <!-- begin row --> */}
                          <div class="row row-space-2">
                            {/* <!-- begin col-6 --> */}
                            <div class="col-md-10 m-b-10">
                              <div class="p-10 bg-white">
                                <div class="media media-xs overflow-visible">
                                  <a class="media-left" href="javascript:;">
                                    <img
                                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                      alt=""
                                      class="media-object img-circle"
                                    />
                                  </a>
                                  <div class="media-body valign-middle">
                                    <b class="text-inverse"> {friend[1]} </b>
                                    <br />
                                    <span class="text-inverse">
                                      {friend[3] &&
                                        friend[3].map((value, index) => {
                                          return (
                                            <span key={index}>{value}, </span>
                                          );
                                        })}{" "}
                                    </span>
                                    <br />
                                    <span class="text-inverse">
                                      {" "}
                                      Age: {friend[2]} years
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <!-- end col-6 -->*/}
                        </div>
                      ))}
                  </div>
                </div>
                {/* <!-- widget single item end --> */}

                <div class="card widget-item">
                  <div class="widget-body"></div>
                </div>

                {/* <!-- widget single item start --> */}
                <div class="card widget-item">
                  <h4
                    class="widget-title"
                    style={{
                      position: "relative",
                      left: "5%",
                      top: "80%",
                      color: "rgb(102, 72, 54)",
                    }}
                  >
                    Friends Suggestions
                  </h4>
                  <div class="widget-body">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className={classes.root}>
                      {suggestedFriends && (
                        <div>
                          {suggestedFriends.map((friend) => (
                            <div>
                              {friend && friend[1] && (
                                <div class="row">
                                  <div class="col-md-2 col-sm-2 media media-xs overflow-visible">
                                    <a class="media-left" href="javascript:;">
                                      <img
                                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                        alt=""
                                        class="media-object img-circle"
                                      />
                                    </a>
                                  </div>

                                  <div class="col-md-4 col-sm-4">
                                    <div key={friend[0]}>
                                      {" "}
                                      <a href="#" class="profile-link">
                                        {" "}
                                        {friend[1]}
                                      </a>{" "}
                                    </div>
                                    <div>Age : {friend[2]}</div>
                                    {/* <p>Profession : {friend[3]}</p> */}
                                  </div>

                                  <div class="col-md-3 col-sm-3">
                                    <button
                                      class="btn btn-primary"
                                      onClick={() => {
                                        handleAddFriend(friend[0]);
                                      }}
                                    >
                                      Add Friend
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* <!-- widget single item end --> */}
              </aside>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
