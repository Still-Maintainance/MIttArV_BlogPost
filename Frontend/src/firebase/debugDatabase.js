import { database, auth } from "./firebase";
import { ref, get, onValue } from "firebase/database";

/**
 * Debug Firebase Realtime Database connection and data retrieval
 * Run this in the browser console to diagnose issues
 */
export const debugFirebase = async () => {
    console.log("=== Firebase Database Debug ===");

    // 1. Check authentication
    console.log("1. Authentication Status:");
    const user = auth.currentUser;
    if (user) {
        console.log("✓ User logged in:", user.email);
    } else {
        console.warn("✗ No user logged in - data won't be accessible");
    }

    // 2. Check database connection
    console.log("\n2. Database Connection:");
    try {
        const postsRef = ref(database, "posts");
        const snapshot = await get(postsRef);
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("✓ Database connected! Posts found:", Object.keys(data).length);
            console.log("Sample post data:", data);
        } else {
            console.warn("✗ No posts in database - create a post first");
        }
    } catch (error) {
        console.error("✗ Database read failed:", error.code, error.message);
        if (error.code === "PERMISSION_DENIED") {
            console.error("  → Database rules are blocking reads!");
        }
    }

    // 3. Check if listener works
    console.log("\n3. Testing Real-time Listener:");
    const postsRef = ref(database, "posts");
    const unsubscribe = onValue(
        postsRef,
        (snapshot) => {
            const data = snapshot.val();
            console.log("✓ Listener triggered with data:", data);
        },
        (error) => {
            console.error("✗ Listener error:", error.code, error.message);
        }
    );

    // Unsubscribe after 5 seconds to avoid memory leaks
    setTimeout(() => {
        unsubscribe();
        console.log("\n4. Debug complete!");
    }, 5000);
};

// Usage: In browser console, run: import { debugFirebase } from './firebase/debugDatabase.js'; debugFirebase();
