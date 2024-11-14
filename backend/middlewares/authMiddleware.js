const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect middleware (checks if user is logged in and token is valid)
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];  // Extract token from 'Bearer <token>'
      
      // Verify the token using the JWT_SECRET from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Add user details to the request object (excluding password)
      req.user = await User.findById(decoded.id).select('-password');
      
      next();  // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Authorization middleware (checks user role)
exports.authorize = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role.name === role) {
      return next();  // Role matches, proceed to the next middleware or route handler
    } else {
      return res.status(403).json({ message: 'Forbidden' });  // Forbidden access if roles don't match
    }
  };
};
