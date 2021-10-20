// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOOvrgEg4qI7fuPNYcuHPIq5tJZcPox6k",
  authDomain: "fir-auth-3b023.firebaseapp.com",
  projectId: "fir-auth-3b023",
  storageBucket: "fir-auth-3b023.appspot.com",
  messagingSenderId: "694392673482",
  appId: "1:694392673482:web:f7f9ed9ac10199ea511033"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };