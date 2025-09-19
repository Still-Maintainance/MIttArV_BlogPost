import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { doSignOut } from "../firebase/auth";
import { database, auth } from "../firebase/firebase";
import { ref, onValue, remove } from "firebase/database";

// --- Icon Components ---
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

// --- Motion Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

const DashboardPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [profile, setProfile] = useState(null);

    // Logout handler
    const handleLogout = async () => {
        try {
            await doSignOut();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Delete post
    const handleDelete = async (postId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const postRef = ref(database, `posts/${postId}`);
            await remove(postRef);
            setUserPosts((prev) => prev.filter((post) => post.id !== postId));
            alert("Post deleted successfully!");
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post. Try again.");
        }
    };

    // Fetch posts and profile of logged-in user
    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            navigate("/"); // redirect if not logged in
            return;
        }

        setCurrentUser({ uid: user.uid, email: user.email, name: user.displayName || "Anonymous" });

        // Fetch posts
        const postsRef = ref(database, "posts");
        onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const userPostsArray = Object.entries(data)
                    .filter(([_, post]) => post.authorId === user.uid)
                    .map(([key, post]) => ({ id: key, ...post }));
                setUserPosts(userPostsArray);
            } else {
                setUserPosts([]);
            }
        });

        // Fetch profile
        const profileRef = ref(database, `profiles/${user.uid}`);
        onValue(profileRef, (snapshot) => {
            const profileData = snapshot.val();
            if (profileData) setProfile(profileData);
        });
    }, [navigate]);

    return (
        <div className="bg-white min-h-screen font-playfair text-black">
            <motion.div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" initial="hidden" animate="visible" variants={containerVariants}>
                {/* Header */}
                <motion.header variants={itemVariants} className="mb-10 border-b border-gray-300 pb-4">
                    <h1 className="text-4xl font-bold text-black">Welcome to your Studio</h1>
                    <p className="text-gray-600 mt-1">Welcome back, {profile?.name}.</p>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Profile Card */}
                    <motion.aside variants={itemVariants} className="lg:col-span-1 border border-gray-300 p-6">
                        <div className="text-center">
                            <img
                                src={profile?.profilePicUrl || "https://placehold.co/100x100/FFFFFF/000000?text=U"}
                                alt={currentUser?.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-300"
                            />
                            <h2 className="text-2xl font-bold">{profile?.name || currentUser?.name}</h2>
                            <p className="text-gray-700 mt-2 mb-2">{profile?.bio || "Manage your blogs and profile."}</p>
                            <p className="text-gray-500 text-sm mb-4">DOB: {profile?.dob || "Not set"}</p>
                            <Link to="/edit-profile">
                                <motion.button className="w-full px-4 py-2 text-md font-medium text-white bg-black rounded-md mb-3" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Edit Profile
                                </motion.button>
                            </Link>
                            <motion.button onClick={handleLogout} className="w-full px-4 py-2 text-md font-medium text-white bg-red-600 rounded-md" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                Log Out 
                            </motion.button>
                        </div>
                    </motion.aside>

                    {/* Posts Section */}
                    <motion.main variants={itemVariants} className="lg:col-span-2 border border-gray-300 p-6">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
                            <h2 className="text-2xl font-bold text-black">My Articles</h2>
                            <Link to="/create-post">
                                <motion.button className="flex items-center gap-2 px-2 py-2 text-md font-medium text-white bg-black" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <PlusIcon />
                                    New Post
                                </motion.button>
                            </Link>
                        </div>

                        {/* Posts List */}
                        <motion.div className="space-y-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                            {userPosts.length === 0 ? (
                                <p className="text-gray-500">You haven't published any posts yet.</p>
                            ) : (
                                userPosts.map((post, index) => (
                                    <motion.div key={post.id} className={`flex items-center justify-between py-4 ${index !== userPosts.length - 1 ? "border-b border-gray-300" : ""}`} variants={itemVariants} whileHover={{ scale: 1.01 }}>
                                        <div>
                                            <h3 className="text-lg font-bold">{post.title}</h3>
                                            <div className="flex items-center text-sm text-gray-600 gap-4 mt-1">
                                                <span>{post.date}</span>
                                                <span>{post.category}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link to={`/edit-post/${post.id}`}>
                                                <motion.button whileTap={{ scale: 0.9 }} className="p-2 text-gray-700 hover:text-black">
                                                    <EditIcon />
                                                </motion.button>
                                            </Link>
                                            <motion.button onClick={() => handleDelete(post.id)} whileTap={{ scale: 0.9 }} className="p-2 text-gray-700 hover:text-black">
                                                <TrashIcon />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    </motion.main>
                </div>
            </motion.div>
        </div>
    );
};

export default DashboardPage;
