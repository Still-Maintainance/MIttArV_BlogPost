import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { database, auth } from "../firebase/firebase";
import { ref, push, set } from "firebase/database";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        category: ""
    });
    const [feedback, setFeedback] = useState({ message: "", type: "" });
    const [lastPost, setLastPost] = useState(null);

    const categories = [
        "Technology", "Lifestyle", "Business", "Health", "Travel", "Education", "Science",
        "Environment", "Food & Cooking", "Sports", "Entertainment", "Finance", "Politics",
        "Culture", "History", "Philosophy", "Psychology", "Productivity", "DIY & Crafts",
        "Fashion", "Parenting", "Relationships", "Self-Improvement", "Startups",
        "Artificial Intelligence", "Space Exploration", "Blockchain & Crypto",
        "Music & Arts", "Books & Literature", "Mental Health", "Climate Change",
        "Marketing & SEO", "Career Development"
    ];

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setFormData((prev) => ({ ...prev, date: today }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) throw new Error("User not logged in");

            // Fix: use email if displayName is null
            const authorName = currentUser.displayName || currentUser.email.split("@")[0] || "Anonymous";

            const postData = {
                ...formData,
                authorId: currentUser.uid,
                authorEmail: currentUser.email || "",
                authorName: authorName
            };

            const postsRef = ref(database, "posts");
            const newPostRef = push(postsRef);
            await set(newPostRef, postData);

            setFeedback({ message: "Post published successfully!", type: "success" });
            setLastPost({ id: newPostRef.key, ...postData });
            setFormData({ title: "", description: "", content: "", category: "", date: new Date().toISOString().split("T")[0] });

            setTimeout(() => setFeedback({ message: "", type: "" }), 3000);
            console.log("Post saved to Firebase:", postData);
        } catch (error) {
            console.error("Error publishing post:", error);
            setFeedback({ message: "Error publishing post. Please try again.", type: "error" });
            setTimeout(() => setFeedback({ message: "", type: "" }), 3000);
        }
    };

    const formVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } };
    const inputVariant = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } };

    return (
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 font-playfair">
            <motion.h1
                className="text-3xl md:text-5xl font-bold mb-10 text-gray-900 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Create Your Blog
            </motion.h1>

            <motion.form onSubmit={handleSubmit} className="space-y-8" variants={formVariant} initial="hidden" animate="visible">
                <motion.input
                    type="text"
                    name="title"
                    placeholder="Title..."
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full text-2xl md:text-3xl font-semibold border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    required
                    variants={inputVariant}
                />
                <motion.input
                    type="text"
                    name="description"
                    placeholder="Short description..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    variants={inputVariant}
                />
                <motion.textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={12}
                    placeholder="Write your content here..."
                    className="w-full text-lg leading-relaxed focus:outline-none focus:border-gray-900 border-b border-gray-300 pb-2 resize-none"
                    required
                    variants={inputVariant}
                />
                <motion.select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    variants={inputVariant}
                >
                    <option value="">Select Category</option>
                    {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                </motion.select>

                <motion.div className="flex flex-col items-center space-y-2 mt-6">
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05, backgroundColor: "#1f2937" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                    >
                        Publish Post
                    </motion.button>

                    <AnimatePresence>
                        {feedback.message && (
                            <motion.span
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`font-semibold ${feedback.type === "success" ? "text-green-600" : "text-red-600"}`}
                            >
                                {feedback.message}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.form>

            {/* Preview card */}
            {lastPost && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 bg-white border border-gray-200 shadow-lg rounded-xl p-6 max-w-xl mx-auto"
                >
                    <h2 className="text-2xl font-bold mb-2">{lastPost.title}</h2>
                    <p className="text-gray-600 mb-2 italic">{lastPost.description}</p>
                    <p className="text-gray-700 mb-2">{lastPost.content.slice(0, 150)}...</p>
                    <div className="flex justify-between text-sm text-gray-500 mt-4">
                        <span>By: {lastPost.authorName}</span>
                        <span>Category: {lastPost.category}</span>
                        <span>Date: {lastPost.date}</span>
                        <span>Post ID: {lastPost.id}</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default CreatePost;
