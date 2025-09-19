import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import Post from './Post'

// Search Icon Component
const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-700 mr-2"
    >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

function PostPage() {
    return (
        <>
            <Navbar />
            <Post />
            <Footer />
        </>
    )
}

export default PostPage
