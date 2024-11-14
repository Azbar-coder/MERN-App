const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');  // Correct import

const router = express.Router();

// Example protected route for admin users
router.get('/dashboard', protect, authorize('admin'), (req, res) => {
  res.send('Welcome to the Admin Dashboard');
});

// Example protected route for regular users
router.get('/profile', protect, authorize('user'), (req, res) => {
  res.send('Welcome to your profile page');
});

module.exports = router;
