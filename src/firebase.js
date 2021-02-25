import firebase from "firebase/app"
import "firebase/auth"

// Not able to access with variables for some reason
// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// })

const app = firebase.initializeApp({
  apiKey: "AIzaSyAkvDAPyd98z1kWS_2dQX9q5NpnGuBXpZ4",
  authDomain: "wassup-f05f5.firebaseapp.com",
  projectId: "wassup-f05f5",
  storageBucket: "wassup-f05f5.appspot.com",
  messagingSenderId: "1003888050777",
  appId: "1:1003888050777:web:b6ce4ebde3319f9ab3a748",
  measurementId: "G-QRC2624LJL"
})
export const auth = app.auth()
export default app
