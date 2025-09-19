const express = require("express");
const cors = require("cors");
const blogs = require('./data/mockdata.json')


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

// Sample route
app.get("/", (req, res) => {    
    res.send("Welcome to the Blog API 🚀");
});



// Get all blogs
app.get("/api/blogs", (req, res) => {
    res.json(blogs);
});

// Get single blog by ID
app.get("/api/blogs/:id", (req, res) => {
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (!blog) return res.status(404).send("Blog not found");
    res.json(blog);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
