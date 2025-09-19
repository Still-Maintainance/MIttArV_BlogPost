import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { database } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";

const FeaturedPostsFirebase = () => {
    const [posts, setPosts] = useState([]);

    const cardVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const headingVariant = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    useEffect(() => {
        const postsRef = ref(database, "posts");
        onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const allBlogs = Object.entries(data).map(([id, blog]) => ({
                    id,
                    ...blog,
                }));

                const shuffled = [...allBlogs];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }

                setPosts(shuffled.slice(0, Math.min(3, shuffled.length)));
            }
        });
    }, []);

    return (
        <section className="font-playfair py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                {/* Heading */}
                <motion.div
                    className="text-center mb-12"
                    initial="hidden"
                    animate="visible"
                    variants={headingVariant}
                >
                    <h2 className="text-6xl sm:text-5xl font-bold text-gray-900">
                        Featured Articles
                    </h2>
                    <p className="text-lg text-gray-700 mt-6">
                        Thoughtful, inspiring, and engaging reads from fellow writers.
                    </p>
                </motion.div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                            variants={cardVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/posts/${post.id}`}>
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <span className="text-sm font-semibold text-indigo-600">
                                        {post.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        {post.content?.slice(0, 300)}...
                                    </p>
                                    <span className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                                        Read More &rarr;
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedPostsFirebase;
