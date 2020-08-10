import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB8ikBWmHy6E8_QxMPOAlJC33hjGUMorRg",
    authDomain: "instagram-clone-78223.firebaseapp.com",
    databaseURL: "https://instagram-clone-78223.firebaseio.com",
    projectId: "instagram-clone-78223",
    storageBucket: "instagram-clone-78223.appspot.com",
    messagingSenderId: "1067716521996",
    appId: "1:1067716521996:web:e30126862c1cb0931f3e29",
    measurementId: "G-QC5DSP41MK"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export  {db, auth, storage};