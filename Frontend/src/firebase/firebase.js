// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";   // ✅ Added Realtime DB
import { getStorage } from "firebase/storage";     // ✅ Added Storage

// Your Firebase web app config
const firebaseConfig = {
    apiKey: "AIzaSyBslIig3owMogRgtDTvd6W-MBi9lm1dU7A",
    authDomain: "blogpost-7f4fa.firebaseapp.com",
    databaseURL: "https://blogpost-7f4fa-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ Updated
    projectId: "blogpost-7f4fa",
    storageBucket: "blogpost-7f4fa.appspot.com",
    messagingSenderId: "458105459499",
    appId: "1:458105459499:web:50865fd820354a9ad9eb6e",
    measurementId: "G-V5W7W3PT14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Existing Auth setup (unchanged)
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ New: Realtime Database & Storage
const database = getDatabase(app);
const storage = getStorage(app);

export { app, auth, googleProvider, database, storage };
