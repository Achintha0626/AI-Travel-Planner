// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add this import


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYpNUGOobVZKc5kMADn8wy1VxshXKZjME",
  authDomain: "ai-travel-planner-332bc.firebaseapp.com",
  projectId: "ai-travel-planner-332bc",
  storageBucket: "ai-travel-planner-332bc.firebasestorage.app",
  messagingSenderId: "59275678325",
  appId: "1:59275678325:web:c57e29a2f67c279c949e3c",
  measurementId: "G-WV95EYYEMT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // This line initializes Firebase Authentication
