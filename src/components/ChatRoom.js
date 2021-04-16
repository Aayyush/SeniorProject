// import './ChatRoom.css';
import { Card, Button, Alert, Nav, NavDropdown, Form, FormControl } from "react-bootstrap"

import 'firebase/auth';
import firebase from 'firebase/app';
import Navbar from 'react-bootstrap/Navbar'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import React, { useRef, useState } from "react"
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';

import 'firebase/firestore';

import './ChatRoom.css'

firebase.app()

const auth = firebase.auth();
const firestore = firebase.firestore();



export default function ChatRoom() {
    const [error, setError] = useState("")
    const [userDataDoc, setUserDataDoc] = useState("")
    const { currentUser, logout, fetchUserDocument } = useAuth()
    const history = useHistory()


    function ChatRoomBoard () {
        const dummy = useRef();
        const messagesRef = firestore.collection('messages');
        const query = messagesRef.orderBy('createdAt').limit(25);

        const [messages] = useCollectionData(query, { idField: 'id' });

        const [formValue, setFormValue] = useState('');

        const sendMessage = async (e) => {
            e.preventDefault();
        
            const { uid, photoURL } = currentUser;
        
            await messagesRef.add({
              text: formValue,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              uid,
              photoURL
            })
        
            setFormValue('');
            dummy.current.scrollIntoView({ behavior: 'smooth' });
          }
        return (<>
        <main>
    
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    
            <span ref={dummy}></span>
    
        </main>
        <form className = "chat-form" onSubmit={sendMessage}>
              <input className="chat-input" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
              <button className="send-button" type="submit" disabled={!formValue}>↗️</button>
        </form>
        </>)
    }

    function ChatMessage(props) {
        const { text, uid, photoURL } = props.message;
      
        const messageClass = uid === currentUser.uid ? 'sent' : 'received';
      
        return (<>
          <div className={`message ${messageClass}`}>
          <img src={photoURL || 'logo512.png'} />
            <p className = "chat-message">{text}</p>
          </div>
        </>)
      }

    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
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
              <NavDropdown.Item href="/profile-interests">Interests</NavDropdown.Item>
              <NavDropdown.Item href="/profile-preferences">Preferences</NavDropdown.Item>
              <NavDropdown.Item href="/profile-friends">Friends</NavDropdown.Item>
              <NavDropdown.Item href="/profile-events">Events</NavDropdown.Item>
              <NavDropdown.Item href="/profile-photos">Photos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/update-profile">Update Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
          <FormControl type="text" placeholder="Search Events" className="mr-md-4" />
                           <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
        </Navbar>
        <div className="chat-app">
            <header>
            <h2>Group Chat 💬</h2>
            </header>
            <section>
                <ChatRoomBoard />
            </section>
        </div>
        </>
    )
  }