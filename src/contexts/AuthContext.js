import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import app from "../firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function addUserDocuments(userObject) {
    var db = firebase.firestore(app);
    console.log("Adding new User");
    console.log(userObject);
    return db.collection("Users").doc(auth.currentUser.uid).set(userObject);
  }

  function addFriend(friendID) {
    var db = firebase.firestore(app);
    return db
      .collection("Users")
      .doc(auth.currentUser.uid)
      .update({
        Friends: firebase.firestore.FieldValue.arrayUnion(friendID),
      });
  }

  function getUserID() {
    return auth.currentUser.uid;
  }

  function fetchUserDocument() {
    var db = firebase.firestore(app);
    console.log("Fetching User data");
    return db.collection("Users").doc(auth.currentUser.uid).get();
  }

  function fetchUserDocumentById(uid) {
    var db = firebase.firestore(app);
    console.log("Fetching User data");
    return db.collection("Users").doc(uid).get();
  }

  function fetchUserDocumentByName(userName) {
    var db = firebase.firestore(app);
    return db.collection("Users").where("Name", "==", userName).get();
  }

  function updateUserDocument(uid, updateObj) {
    var db = firebase.firestore(app);
    return db.collection("Users").doc(uid).update(updateObj);
  }

  function fetchAllUsers() {
    var db = firebase.firestore(app);
    console.log("Fetching all User data");
    return db.collection("Users");
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  // Events
  function createNewEvent(eventObject) {
    var db = firebase.firestore(app);
    console.log("Adding new Event");
    return db.collection("Events").add(eventObject);
  }

  function fetchAllEvents() {
    var db = firebase.firestore(app);
    console.log("Fetching all Event data");
    return db.collection("Events");
  }

  function fetchEventWithID(eventId) {
    var db = firebase.firestore(app);
    return db.collection("Events").doc(eventId).get();
  }

  function getDB() {
    return firebase.firestore(app);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    getUserID,
    addUserDocuments,
    addFriend,
    fetchUserDocument,
    fetchUserDocumentByName,
    fetchAllUsers,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    createNewEvent,
    updateUserDocument,
    fetchEventWithID,
    fetchUserDocumentById,
    getDB,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
