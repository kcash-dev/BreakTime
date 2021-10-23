// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import { firebaseConfig } from '../keys/Keys';

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };