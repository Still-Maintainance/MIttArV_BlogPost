// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {Auth, getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBslIig3owMogRgtDTvd6W-MBi9lm1dU7A",
    authDomain: "blogpost-7f4fa.firebaseapp.com",
    projectId: "blogpost-7f4fa",
    storageBucket: "blogpost-7f4fa.firebasestorage.app",
    messagingSenderId: "458105459499",
    appId: "1:458105459499:web:50865fd820354a9ad9eb6e",
    measurementId: "G-V5W7W3PT14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth}