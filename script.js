//https://www.gstatic.com/firebasejs/12.15.0/

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { sendSignInLinkToEmail } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

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

const actionCodeSettings = {
    url: "https://sohamthecoder123.github.io/",
    handleCodeInApp: true
}

const emailField = document.getElementById("email");
const enterButton = document.getElementById("enter");
const status = document.getElementById("status");


enterButton.addEventListener("click", 
    async () => {
        const email = emailField.value.trim();
        alert(email);
        emailField.value = ""; 

        if(!email) {
            status.textContent = "Please type something";
            return;
        }

        try {
            
            await sendSignInLinkToEmail(
                auth, 
                email,
                actionCodeSettings
            );

            localStorage.setItem("emailForSignIn", email);

            status.textContent = "Check your email for the sign-in link.";
        } catch (err) {
            console.log(err);

            status.textContent = err.message;
        }
    }
)