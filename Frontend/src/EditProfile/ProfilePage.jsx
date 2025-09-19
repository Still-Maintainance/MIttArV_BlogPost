import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { database } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProfilePage = () => {
    const { userId } = useParams();
    const [userBlogs, setUserBlogs] = useState([]);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;
        const postsRef = ref(database, "posts");

        onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const blogs = Object.entries(data)
                    .filter(([_, post]) => post.authorId === userId)
                    .map(([id, post]) => ({ id, ...post }));
                setUserBlogs(blogs);

                if (blogs.length > 0) {
                    setUserName(blogs[0].authorName || "Unknown Author");
                    setUserEmail(blogs[0].authorEmail || "No Email Provided");
                } else {
                    setUserName("Unknown Author");
                    setUserEmail("No Email Provided");
                }
            } else {
                setUserName("Unknown Author");
                setUserEmail("No Email Provided");
            }
            setLoading(false);
        });
    }, [userId]);

    if (loading) return <p className="text-center mt-10">Loading profile...</p>;

    return (
        <>
            <Navbar />
            <div className="max-w-5xl mx-auto py-10 px-4">
                <h1 className="text-4xl font-bold mb-4">{userName}'s Profile</h1>
                <p className="text-gray-600 mb-6">Email: {userEmail}</p>

                <h2 className="text-2xl font-semibold mb-4">Blogs by {userName}</h2>
                {userBlogs.length === 0 ? (
                    <p className="text-gray-500">No posts yet.</p>
                ) : (
                    <div className="space-y-6">
                        {userBlogs.map((blog) => (
                            <div key={blog.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition">
                                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                                <p className="text-gray-600 mb-2">{blog.description}</p>
                                <div className="flex justify-between text-sm text-gray-500 mb-2">
                                    <span>{blog.date}</span>
                                    <span>{blog.category}</span>
                                </div>
                                <Link to={`/posts/${blog.id}`} className="text-blue-600 hover:underline">Read More →</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ProfilePage;
