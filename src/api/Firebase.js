// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import "firebase/firestore"
import apiKeys from '../config/Keys';
import { Alert } from 'react-native';
import moment from 'moment';


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(apiKeys.firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore();
const user = firebase.auth().currentUser;
let currentUserUID;

auth.onAuthStateChanged((user) => {
    if(user) {
        currentUserUID = user.uid
    } else {
        return;
    }
})

// SIGN UP
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
    
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        lastName: lastName,
        firstName: firstName,
        notFocused: 0,
        somewhatFocused: 0,
        veryFocused: 0,
        todaysFocus: []
      });
}

//SIGN IN
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
    .catch(err => console.log(Alert.alert(err.message)))
}

// ADD TASK
async function addTask(time, foundTask) {
    let incrementFocus = time
    const incrementFocusTime = firebase.firestore.FieldValue.increment(incrementFocus)
    
    await db
    .collection('users')
    .doc(currentUserUID)
    .update({
        tasks: firebase.firestore.FieldValue.arrayUnion(foundTask),
        totalFocusTime: incrementFocusTime,
        todaysFocus: firebase.firestore.FieldValue.arrayUnion(foundTask)
    })
}

// REMOVE TASK
async function thisTask(obj) {
    await db.collection('users').doc(currentUserUID).update({
        tasks: firebase.firestore.FieldValue.arrayRemove(obj),
        todaysFocus: firebase.firestore.FieldValue.arrayRemove(obj)
    })
}

async function deleteTask(id) {
    let doc = await db
            .collection('users')
            .doc(currentUserUID)
            .get()
    const taskList = doc.data().tasks
    taskList.forEach(doc => {
        if(doc.id === id) {
            let obj = doc;
            thisTask(obj)
        }
    })
}

//RESET DAILY TASKS

var midnight = "00:00:00";
var now = null;

setInterval(async function () {
    now = moment().format("H:mm:ss");
    if (now === midnight) {
        await db.collection('users').doc(currentUserUID).update({
            todaysFocus: firebase.firestore.FieldValue.delete()
        })
    }
}, 1000);


//LOGOUT

async function handleSignOut() {
    auth
    .signOut()
    .then(() => {
        console.log('FIRED')
    })
    .catch(err => alert(err.message))
}

//SET EXPO TOKEN
async function setExpo(token) {
    db.collection('users').doc(currentUserUID).update({
        expoToken: token
    })
}

//EXPORT
export { db, auth, handleSignup, handleLogin, handleSignOut, addTask, deleteTask, setExpo, currentUserUID, user };