import firebase from 'firebase/compat'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyADdYdTtYiHA59xUdEpqysexQoF-QQeNAM",

    authDomain: "instagram-clone-ffc8b.firebaseapp.com",

    projectId: "instagram-clone-ffc8b",

    storageBucket: "instagram-clone-ffc8b.appspot.com",

    messagingSenderId: "987568806214",

    appId: "1:987568806214:web:280c75c51bc6ec765aad47",

    measurementId: "${config.measurementId}"
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };