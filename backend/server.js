require('dotenv').config();  // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');  // Import the routes
// const authMiddleware=require('../middlewares/authMiddleware');

const app = express();
app.use(express.json());  // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

// Use the routes
app.use('/api/auth', authRoutes);

// Set the port from environment variables or use default
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
