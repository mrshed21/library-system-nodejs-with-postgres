// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error

  const status = err.status || 500; // Default to 500 if no status is provided
  res.status(status).json({
    success: false,
    error: err.message,
    details: err.errors,
  });
};

module.exports = errorHandler;
