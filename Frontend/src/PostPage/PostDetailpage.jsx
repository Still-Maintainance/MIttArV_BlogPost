import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { database } from "../firebase/firebase";
import { ref, get } from "firebase/database";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const blogRef = ref(database, `posts/${id}`);
        get(blogRef).then((snapshot) => {
            if (snapshot.exists()) {
                setBlog(snapshot.val());
            } else {
                setBlog({ title: "Blog not found", content: "" });
            }
        });
    }, [id]);

    if (!blog) return <p className="text-center mt-10">Loading...</p>;

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md font-playfair">
                <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>
                <p className="text-gray-600 mb-6">
                    By <span className="font-medium">{blog.authorName}</span>
                </p>
                <div className="flex justify-between text-sm text-gray-500 mb-6">
                    <span>{blog.date}</span>
                    <span className="font-medium text-blue-600">{blog.category}</span>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>
                <Link
                    to="/posts"
                    className="inline-block mt-6 text-blue-600 underline"
                >
                    ← Back to Blogs
                </Link>
            </div>
            <Footer />
        </>
    );
};

export default BlogDetailPage;
