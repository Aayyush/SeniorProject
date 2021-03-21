import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import app from "../firebase"
import firebase from "firebase/app"
import 'firebase/firestore'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  
  function addUserDocuments() {
	var db = firebase.firestore(app);
	return db.collection('Users').doc(auth.currentUser.uid).set({Name: '', 
																 Age: '', 
																 Address: '',
																 Location: new firebase.firestore.GeoPoint(0, 0),
																 ProfilePic: db.doc('wassup-f05f5.appspot.com/asdf.jpg'),
																 Bio: '',
																 Friends: {},
																 Hobbies: {},
																 Preferences: {},
																 Events: {}})
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
	addUserDocuments,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
