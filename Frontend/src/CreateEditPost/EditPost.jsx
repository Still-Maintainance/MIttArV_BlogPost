import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { database } from "../firebase/firebase";
import { ref, onValue, update } from "firebase/database";

const EditPost = () => {
    const { id } = useParams(); // route param name should match in App.jsx
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        date: "",
        category: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    const categories = ["Technology", "Lifestyle", "Business", "Health", "Travel", "Education"];

    // Fetch post from Firebase
    useEffect(() => {
        if (!id) return;
        const postRef = ref(database, `posts/${id}`);
        onValue(postRef, (snapshot) => {
            const post = snapshot.val();
            if (post) {
                setFormData(post);
            } else {
                alert("Post not found!");
                navigate("/dashboard");
            }
            setLoading(false);
        });
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await update(ref(database, `posts/${id}`), {
                ...formData,
                date: new Date().toLocaleDateString(), // Update the date
            });
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
            alert("Post updated successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating post:", error);
            alert("Failed to update post.");
        }
    };

    // Variants
    const formVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } };
    const inputVariant = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } };

    if (loading) return <p className="text-center mt-10">Loading post...</p>;

    return (
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 font-playfair">
            <motion.h1
                className="text-3xl md:text-5xl font-bold mb-10 text-gray-900 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Edit Your Blog Post
            </motion.h1>

            <motion.form
                onSubmit={handleSubmit}
                className="space-y-8"
                variants={formVariant}
                initial="hidden"
                animate="visible"
            >
                {/* Title */}
                <motion.input
                    type="text"
                    name="title"
                    placeholder="Title of your blog..."
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full text-2xl md:text-3xl font-semibold border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    required
                    variants={inputVariant}
                />

                {/* Description */}
                <motion.input
                    type="text"
                    name="description"
                    placeholder="Short description or subtitle..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    variants={inputVariant}
                />

                {/* Content */}
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


                {/* Category */}
                <motion.select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full text-lg border-b border-gray-300 focus:outline-none focus:border-gray-900 pb-2"
                    variants={inputVariant}
                >
                    <option value="">Select Category</option>
                    {categories.map((cat, i) => (
                        <option key={i} value={cat}>
                            {cat}
                        </option>
                    ))}
                </motion.select>

                {/* Submit Button + Feedback */}
                <motion.div className="flex items-center space-x-4 mt-6">
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05, backgroundColor: "#1f2937" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                    >
                        Update Post
                    </motion.button>

                    <AnimatePresence>
                        {submitted && (
                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="text-green-600 font-semibold"
                            >
                                Post Updated!
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.form>
        </div>
    );
};

export default EditPost;

