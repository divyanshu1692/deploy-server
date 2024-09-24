// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./model/User.model.js');


// Load environment variables
dotenv.config();

const MONGO_URI = `mongodb+srv://divyanshubisht169:${process.env.NODE_MONOGDB_PASSWROD}@deployment-cluster.dzxqn.mongodb.net/mern-db ?retryWrites=true&w=majority&appName=deployment-cluster`

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// User route to add a new User
app.post('/api/users', async (req, res) => {
    const { username, email } = req.body;

    try {
        const newUser = new User({
            username,
            email
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        const response = await User.find();        
        res.status(200).json({ data: response })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Start server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
