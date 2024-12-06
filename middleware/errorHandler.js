// Global error handler
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).send('<h1>Something went wrong</h1><a href="/">Go to Home</a>');
};

module.exports = errorHandler;
