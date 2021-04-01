import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Profile.css";
import "./ProfileInterests.css";

export default function ProfileInterest() {
  const [error, setError] = useState("");
  const [userDataDoc, setUserDataDoc] = useState("");
  const { currentUser, logout, fetchUserDocument } = useAuth();
  const history = useHistory();

  async function getUserData() {
    const doc = await fetchUserDocument();
    return doc;
  }
  if (!userDataDoc) {
    getUserData().then((doc) => setUserDataDoc(doc.data()));
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

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div id="content" class="content content-full-width">
            {/* <!-- begin profile --> */}
            <div class="profile">
              <div class="profile-header">
                {/* <!-- BEGIN profile-header-cover --> */}
                <div class="profile-header-cover"></div>
                {/* <!-- END profile-header-cover -->
                      <!-- BEGIN profile-header-content --> */}
                <div class="profile-header-content">
                  {/* <!-- BEGIN profile-header-img --> */}
                  <div class="profile-header-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      alt=""
                    ></img>
                  </div>
                  {/* <!-- END profile-header-img -->
                         <!-- BEGIN profile-header-info --> */}
                  <div class="profile-header-info">
                    {userDataDoc && (
                      <h4 class="m-t-10 m-b-5">{userDataDoc["Name"]}</h4>
                    )}
                    <div>
                      {userDataDoc &&
                        userDataDoc["Profession"] &&
                        userDataDoc["Profession"].join(",")}
                    </div>
                    <div>
                      <a
                        href="/update-profile-interests"
                        class="btn btn-sm btn-info mb-2"
                      >
                        Edit Profile
                      </a>
                    </div>
                  </div>
                  {/* <!-- END profile-header-info --> */}
                </div>
                {/* <!-- END profile-header-content -->
                      <!-- BEGIN profile-header-tab --> */}
                <ul class="profile-header-tab nav nav-tabs">
                  <li class="nav-item">
                    <Link
                      to="/profile-about"
                      class="nav-link"
                      data-toggle="tab"
                    >
                      ABOUT
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      to="/profile-interests"
                      class="nav-link active show"
                      data-toggle="tab"
                    >
                      INTERESTS
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link
                      to="/profile-events"
                      class="nav-link"
                      data-toggle="tab"
                    >
                      EVENTS
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/profile" class="nav-link" data-toggle="tab">
                      FRIENDS
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link
                      to="/profile-photos"
                      class="nav-link"
                      data-toggle="tab"
                    >
                      PHOTOS
                    </Link>
                  </li>
                </ul>
                {/* <!-- END profile-header-tab --> */}
              </div>
            </div>
            {/* <!-- end profile -->
               {/* <!-- end tab-content --> */}
          </div>
          <div class="profile-content">
            {/* <!-- begin tab-content --> */}
            <div class="tab-content p-0">
              {/* <!-- begin #profile-about tab --> */}
              <div class="tab-pane fade in active show" id="profile-interests">
                {/* <!-- begin row --> */}
                <div class="row row-space-2">
                  {/* <!-- begin col-6 --> */}
                  <div class="btn-toolbar">
                    {userDataDoc && (
                      <ul>
                        {userDataDoc["Hobbies"].map((value, index) => {
                          return <button key={index}>{value}</button>;
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end profile-content --> */}
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
