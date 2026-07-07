// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD-dtutxZ4MF-5BegR5GgY-P9dcFAJCxS4",
  authDomain: "champion-pick.firebaseapp.com",
  projectId: "champion-pick",
  storageBucket: "champion-pick.firebasestorage.app",
  messagingSenderId: "50006821239",
  appId: "1:50006821239:web:e13c3817bf55276cd37972",
  measurementId: "G-9K91J1DVTY"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Firestore

export const db = getFirestore(app);