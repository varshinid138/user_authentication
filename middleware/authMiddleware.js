const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // Token from Authorization header
  if (!token) {
    const error = new Error('Access Denied. No Token Provided');
    error.status = 401; // Unauthorized
    return next(error); // Pass error to errorHandler
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the verified user to the request object
    next(); // Proceed to the next middleware or route
  } catch (err) {
    err.message = 'Invalid Token';
    err.status = 400; // Bad Request
    next(err); // Pass error to errorHandler
  }
};

module.exports = verifyToken;
