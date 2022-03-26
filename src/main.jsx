import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCr4EmxZVvVtB2SmzXX02phPYgitAYT8Hw",
  authDomain: "cha-alice.firebaseapp.com",
  projectId: "cha-alice",
  storageBucket: "cha-alice.appspot.com",
  messagingSenderId: "842731855341",
  appId: "1:842731855341:web:f336be51ada3ef221e9be4"
};

try {
  initializeApp(firebaseConfig);
} catch {
  console.warn('error when starting firebase')
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
