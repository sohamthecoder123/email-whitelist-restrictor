//https://www.gstatic.com/firebasejs/12.15.0/
///please build ffs

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
    getAuth,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    isSignInWithEmailLink,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log("Signed in:");
        console.log(user.email);

        status.textContent = `Welcome, ${user.email}!`;

        emailField.hidden = true;
        enterButton.hidden = true;
        logoutButton.hidden = false;

    } else {

        console.log("Not signed in.");

        status.textContent = "Please sign in.";

        emailField.hidden = false;
        enterButton.hidden = false;
        logoutButton.hidden = true;

    }
});

console.log("Firebase initialized");

const actionCodeSettings = {
    url: "https://sohamthecoder123.github.io/email-whitelist-restrictor/",
    handleCodeInApp: true
}

const emailField = document.getElementById("email");
const enterButton = document.getElementById("enter");
const status = document.getElementById("status");
const logout = document.getElementById("logout");

enterButton.addEventListener("click", 
    async () => {
        const email = emailField.value.trim();
        //alert(email);
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
            console.error("Error object:", err);
            console.error("Code:", err.code);
            console.error("Message:", err.message);

            status.textContent = err.message;
        }
    }
)

logout.addEventListener("click",
    async () => {
        try {
            await signOut(auth);
            status.textContent = "Signed Out."
        } catch (err) {
            console.log(err);
        }
    }
)

if (isSignInWithEmailLink(auth, window.location.href)) {

    try {

        console.log("Email sign-in link detected.");

        let email = localStorage.getItem("emailForSignIn");

        if (!email) {
            email = prompt("Please confirm your email address");
        }

        const result = await signInWithEmailLink(
            auth,
            email,
            window.location.href
        );

        localStorage.removeItem("emailForSignIn");

        console.log("Successfully signed in!");
        console.log(result.user);

    } catch (err) {

        console.error("Sign-in failed:", err);

    }
}