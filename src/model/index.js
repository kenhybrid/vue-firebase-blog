//firebase
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAP-fHcQkhXchGmXQhbfKdjIKHKkQcKAEE",
  authDomain: "blog-cc496.firebaseapp.com",
  databaseURL: "https://blog-cc496.firebaseio.com",
  projectId: "blog-cc496",
  storageBucket: "blog-cc496.appspot.com",
  messagingSenderId: "467927206787",
  appId: "1:467927206787:web:242a10b3cc7f131d5e84b6",
  measurementId: "G-LGMQGQEN1X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//utils
const auth = firebase.auth();
const database = firebase.firestore();
const storage = firebase.storage();

export { database, auth, storage };
