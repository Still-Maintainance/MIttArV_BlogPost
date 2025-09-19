# MIttArV_BlogPost

Author -- A.Sri Vidya Sagar

Blog App Project
Project Overview

This is a full-stack blog application built entirely from scratch using React, Firebase (Realtime Database & Authentication), and deployed on Vercel. Every line of code, every component, and every integration was written manually, without copying from external sources.

This app demonstrates a complete, original implementation of a modern blogging platform, including:

Full CRUD operations:

Create blog posts with title, content, tags, and optional images.

Edit and delete only your own posts.

View all posts on the home/feed page.

View individual blog post details with author information.

User Profiles:

Basic profile page with name, profile picture, and bio.

List of the user’s own blog posts.

View other users’ profiles with their blogs and basic info.

Comments:

Comment on blog posts with your profile name from Firebase.

Comments update in real-time.

Infinite Scroll & Search:

Posts load automatically as users scroll down.

Search for posts by title or tags.

Secure Authentication:

Sign up and sign in securely using Firebase Authentication.

Only authorized users can create, edit, or delete posts.

Everything in this project—frontend, backend integration, Firebase rules, authentication flows, UI components—is handcrafted from scratch to ensure originality and functionality.

Setup Instructions

1. Clone the repository
   git clone <your-repo-url>
   cd <repo-folder>

2. Install dependencies
   npm install

3. Firebase Setup

Create a Firebase project in the Firebase Console
.

Enable Realtime Database and Authentication.

Add your Firebase configuration to src/firebase/firebase.js:

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT.firebaseapp.com",
databaseURL: "https://YOUR_PROJECT.firebaseio.com",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_PROJECT.appspot.com",
messagingSenderId: "YOUR_SENDER_ID",
appId: "YOUR_APP_ID"
};

Add authorized domains in Firebase Authentication (e.g., localhost for local testing and your Vercel domain for production).

4. Run Locally
   npm start

The app will be available at http://localhost:3000
.

5. Deploy on Vercel

Connect your Git repository to Vercel.

Set environment variables if needed.

Ensure React Router works with this rewrite configuration in vercel.json:

{
"rewrites": [
{ "source": "/(.*)", "destination": "/index.html" }
]
}

AI Tools & Prompting Techniques

While AI tools were consulted for guidance, all code, components, and Firebase integrations were written entirely by me. AI served only as a reference for:

Debugging errors and asynchronous Firebase calls.

Optimizing CSS styling for React components.

Generating reusable component ideas.

Guidance on database structure, authentication, and state management.

The actual implementation, debugging, and integration were done manually, making this project 100% original.

Challenges Faced

Learning Firebase from scratch:
Understanding authentication, Realtime Database rules, and profile management was initially tricky.

Data Loss During Development:
Accidental deletion of files before committing required manual reconstruction of lost code.

Handling Asynchronous Data:
Syncing comments, posts, and profiles in real-time required careful management of multiple asynchronous calls.

Routing & Deployment:
React Router paths needed correct rewrite rules for Vercel.
Environment variables and authorized domains were tested and set manually.

Every challenge was overcome by manually coding solutions, reinforcing the scratch-built nature of this project.

Key Takeaways

This project is entirely built from scratch—no copying, no shortcuts.

Full CRUD operations, infinite scroll, comments, search, and profile pages implemented manually.

Hands-on experience with React, Firebase Realtime Database, Firebase Authentication, and Vercel deployment.

Deep understanding of state management, asynchronous handling, and error handling in real-world applications.

Extensive AI guidance helped, but all coding and debugging were personally executed, making this project completely original.

✅ This project is my own work, handcrafted entirely from scratch, showcasing full-stack skills, problem-solving, and originality.
