const jwt = require('jsonwebtoken');

// Extract the JWT token from the Authorization header
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Check for Missing Token
  if (!token) {
    return res.status(401).json({ message: 'No token provided' }); 
  }

  // JWT Verification
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT verification failed:', err); 
      return res.status(403).json({ message: 'Invalid or expired token' }); 
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;