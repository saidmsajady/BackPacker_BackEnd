const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' }); // Detailed error message for debugging
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT verification failed:', err); // Log the error for debugging
      return res.status(403).json({ message: 'Invalid or expired token' }); // Detailed error for the client
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;