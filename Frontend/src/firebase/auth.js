// auth.js
import { auth, googleProvider } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    updatePassword,
    signInWithPopup,
} from "firebase/auth";

// Sign up with email & password
export const doCreateUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with email & password
export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google popup
export const doSignInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};

// Sign out (logout)
export const doSignOut = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully.");
    } catch (error) {
        console.error("Error signing out:", error);
        throw error; // propagate error for handling in UI
    }
};

// Send password reset email
export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

// Send email verification
export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};

// Update password
export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};
