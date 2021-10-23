// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import "firebase/firestore"
import { firebaseConfig } from '../config/Keys';
import { Alert } from 'react-native'

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

async function handleSignup(email, password, firstName, lastName) {
    if(!email) {
        Alert.alert('Must enter a valid email')
    } else if (!password) {
        Alert.alert('Must enter a valid password')
    }

    await auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
        const user = userCredentials.user
        console.log('Registered with: ' + user.email)
    })
    .catch(err => err.message === "The email address is already in use by another account." ? Alert.alert(err.message) : console.log(err.message))

    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        lastName: lastName,
        firstName: firstName,
      });
}

async function handleLogin(email, password) {
    if(!email) {
        Alert.alert('Must enter a valid email')
    } else if (!password) {
        Alert.alert('Must enter a valid password')
    }

    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
        const user = userCredentials.user
        console.log('Logged in with: ' + user.email)
    })
    .catch(err => console.log(err.message))
}

export { auth, handleSignup, handleLogin };