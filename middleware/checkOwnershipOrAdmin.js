exports.checkOwnershipOrAdmin = (req, res, next) => {
  const userIdFromToken = req.user.id;     
  const userRole = req.user.role;
  const userIdFromParams = req.params.id;  

  if (userRole === 'admin') {
    return next();
  }

  if (userIdFromToken == userIdFromParams) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied: you can only modify your own account'
  });
};
