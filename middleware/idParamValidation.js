

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    const err = new Error("Invalid ID");
    err.status = 400;
    return next(err);
  }
  next();
};


module.exports = { validateId };
