// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4hql8ApZFCZXTCqAswRXNY9AQ7TEZMCs",
  authDomain: "news-app-6fb3f.firebaseapp.com",
  projectId: "news-app-6fb3f",
  storageBucket: "news-app-6fb3f.firebasestorage.app",
  messagingSenderId: "1013648179384",
  appId: "1:1013648179384:web:7a00150cac5e10f940b44d",
  measurementId: "G-JJH9XLVB3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication

// DOM Elements
let create_acc = document.querySelector("#create_acc");
let have_acc = document.querySelector("#have_acc");
let sign_up = document.querySelector("#signup");
let log_in = document.querySelector("#login");

// Toggle between Sign-Up and Login forms
create_acc.addEventListener("click", (e) => {
  e.preventDefault();
  sign_up.style.display = "grid";
  log_in.style.display = "none";
});

have_acc.addEventListener("click", () => {
  sign_up.style.display = "none";
  log_in.style.display = "grid";
});

// Sign-Up Function
const signUp = (e) => {
  e.preventDefault(); // Prevent form submission
  const email = document.querySelector("#email_signup").value;
  const password = document.querySelector("#password_signup").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User Registered:", userCredential.user);
      alert("Sign-up successful!");
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(error.message);
    });
};

// Login Function
const login = (e) => {
  e.preventDefault(); // Prevent form submission
  const email = document.querySelector("#email_login").value;
  const password = document.querySelector("#password_login").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User Logged In:", userCredential.user);
      alert("Login successful!");
      window.location.href = "index.html"; // Redirect to the dashboard
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(error.message);
    });
};

// Attach event listeners to buttons
document.querySelector("#signup button").addEventListener("click", signUp);
document.querySelector("#login button").addEventListener("click", login);
