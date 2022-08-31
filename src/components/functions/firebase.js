import { initializeApp, getApps ,getApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyC7Kz9K_7te12T32i9nLTJVAhP58tQw5Xo",
    authDomain: "websiteave-c6330.firebaseapp.com",
    projectId: "websiteave-c6330",
    storageBucket: "websiteave-c6330.appspot.com",
    messagingSenderId: "466296451705",
    appId: "1:466296451705:web:c254b6c2891beb2cc69aa8",
    measurementId: "G-4SJ8T5B9J2"
  };
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export {app,db,storage}