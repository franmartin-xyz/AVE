import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyC7Kz9K_7te12T32i9nLTJVAhP58tQw5Xo",
  authDomain: "websiteave-c6330.firebaseapp.com",
  projectId: "websiteave-c6330",
  storageBucket: "websiteave-c6330.appspot.com",
  messagingSenderId: "466296451705",
  appId: "1:466296451705:web:c254b6c2891beb2cc69aa8",
  measurementId: "G-4SJ8T5B9J2"
};
initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

