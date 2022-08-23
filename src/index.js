import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"



// initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// export const provider = new GoogleAuthProvider();
// export const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

