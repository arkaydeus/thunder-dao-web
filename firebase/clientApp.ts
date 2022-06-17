// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDuZKBawghqdter9e6A9M4DHeJnI6yIwRM',
  authDomain: 'thunder-bot-351913.firebaseapp.com',
  projectId: 'thunder-bot-351913',
  storageBucket: 'thunder-bot-351913.appspot.com',
  messagingSenderId: '193768201497',
  appId: '1:193768201497:web:ac70ec4fce6b84efb1b988',
  measurementId: 'G-CHMLV71GNR'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
// const analytics = getAnalytics(firebaseApp)
export const auth = getAuth(firebaseApp)
export default firebaseApp
