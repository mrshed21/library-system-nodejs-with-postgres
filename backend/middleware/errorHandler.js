// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error


  // Sequelize Unique constraint error  
  if (err.name === "SequelizeUniqueConstraintError") {
    const field = err.errors[0]?.path; // First field causing the problem
    return res.status(400).json({
      success: false,
      message: `${field} must be unique`
    });
  }

  // If Zod error
  if (err.errors && Array.isArray(err.errors)) {
    return res.status(400).json({
      success: false,
      message: err.errors.map(e => e.message).join(", ")
    });
  }

  // general errors
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });



};

module.exports = errorHandler;