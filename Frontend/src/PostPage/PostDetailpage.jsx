import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { database } from "../firebase/firebase";
import { ref, get, push, onValue } from "firebase/database";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/authContext";

const BlogDetailPage = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const [blog, setBlog] = useState(null);
    const [authorProfile, setAuthorProfile] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    // Fetch blog and author profile
    useEffect(() => {
        const blogRef = ref(database, `posts/${id}`);
        get(blogRef).then(async (snapshot) => {
            if (!snapshot.exists()) return setBlog({ title: "Blog not found", content: "" });
            const blogData = snapshot.val();
            setBlog(blogData);

            // Fetch author profile
            const authorRef = ref(database, `profiles/${blogData.authorId}`);
            const authorSnap = await get(authorRef);
            setAuthorProfile(authorSnap.exists() ? authorSnap.val() : { name: "Unknown Author" });
        });

        // Fetch comments
        const commentsRef = ref(database, `comments/${id}`);
        onValue(commentsRef, (snapshot) => {
            if (snapshot.exists()) setComments(Object.values(snapshot.val()));
            else setComments([]);
        });
    }, [id]);

    // Handle posting a comment
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) return alert("Sign in to comment!");
        if (!comment.trim()) return;

        // Fetch commenter profile
        const profileRef = ref(database, `profiles/${currentUser.uid}`);
        const profileSnap = await get(profileRef);
        const commenterName = profileSnap.exists() ? profileSnap.val().name : "Anonymous";

        const newComment = {
            text: comment,
            userName: commenterName,
            userId: currentUser.uid,
            date: new Date().toLocaleString(),
        };

        const commentsRef = ref(database, `comments/${id}`);
        await push(commentsRef, newComment);
        setComments((prev) => [...prev, newComment]);
        setComment("");
    };

    if (!blog) return <p className="text-center mt-10">Loading...</p>;

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md font-playfair">
                <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>
                <p className="text-gray-600 mb-6">By <span className="font-medium">{authorProfile?.name}</span></p>
                <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>

                <Link to="/posts" className="inline-block mt-6 text-blue-600 underline">
                    ← Back to Blogs
                </Link>

                <div className="mt-10 border-t pt-6">
                    <h2 className="text-2xl font-bold mb-4">Comments</h2>
                    <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-3">
                        <textarea
                            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                        />
                        <button type="submit" className="bg-black text-white px-4 py-2">Post Comment</button>
                    </form>

                    <div className="mt-6 space-y-4">
                        {comments.length > 0 ? (
                            comments.map((c, index) => (
                                <div key={index} className="border-b pb-3">
                                    <Link to={`/profile/${c.userId}`} className="font-semibold underline text-blue-400">
                                        {c.userName}
                                    </Link>
                                    <span className="text-gray-500 text-sm ml-2">{c.date}</span>
                                    <p className="mt-1 text-gray-700">{c.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No comments yet. Be the first!</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogDetailPage;
