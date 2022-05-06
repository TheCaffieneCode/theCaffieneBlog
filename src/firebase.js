import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

firebase.initializeApp({
  apiKey: "AIzaSyCaHl4tgtp4A56vaCLY-rq5kP930tw8oVg",
  authDomain: "myblogsite-6d831.firebaseapp.com",
  projectId: "myblogsite-6d831",
  storageBucket: "myblogsite-6d831.appspot.com",
  messagingSenderId: "137334216142",
  appId: "1:137334216142:web:2e8be932bad5676216479f",
  databaseURL: 'https://myblogsite-6d831.firebaseio.com'
});

const fb = firebase;

export default fb;