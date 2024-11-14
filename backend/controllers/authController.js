const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (user) => {
  // Use process.env.JWT_SECRET to access the secret stored in the .env file
  return jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET,  // JWT secret is now accessed from the environment variable
    { expiresIn: '1h' }
  );
};

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate('role');
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user);
      res.json({ token, role: user.role.name });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
