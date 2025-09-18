import Navbar from "./Navbar";
import Hero from "./Hero";
import FeaturedPosts from "./FeaturedPosts";
import Wod from "./RandomWord";
import Footer from "./Footer";

function HomePage() {
    return (
        <>
            <Navbar />
            <Hero />
            <FeaturedPosts />
            <Wod/>
            <Footer/>
            
        </>
    )
}

export default HomePage;