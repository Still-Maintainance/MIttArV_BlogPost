import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Configuration is loaded from environment variables using Vite's import.meta.env
// Note: All client-side env vars must be prefixed with VITE_ in the .env file.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize services (Auth, Google Provider, Realtime Database, Storage)
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app);
const storage = getStorage(app);

// Export necessary Firebase objects for use throughout your application
export { app, auth, googleProvider, database, storage };
