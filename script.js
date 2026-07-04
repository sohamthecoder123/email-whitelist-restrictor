//https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js

import firebase from "firebase/compat/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIDBDxYpUO39alKgiYKv1MRsMrcBzMRD4",
    authDomain: "email-whitelist-restrictor.firebaseapp.com",
    projectId: "email-whitelist-restrictor",
    storageBucket: "email-whitelist-restrictor.firebasestorage.app",
    messagingSenderId: "506644108680",
    appId: "1:506644108680:web:73b07f85d1dea93c4bd63d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase initialized");