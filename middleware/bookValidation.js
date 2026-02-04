const createBookValidation = (req, res, next) => {
    const { name, price, stock, author_id, genre_ids } = req.body;

    if (!name || !price || !stock || !author_id || !genre_ids) {
        const error = new Error('Missing required fields');
        error.status = 400;
        return next(error);
    }

  next();
};

const updateBookValidation = (req, res, next) => {
  const { name, price, stock, author_id, genre_ids } = req.body;

  if (genre_ids && !Array.isArray(genre_ids)) {
    const err = new Error("genre_ids must be an array");
    err.status = 400;
    return next(err);
  }
  next();
};


const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    const err = new Error("Invalid ID");
    err.status = 400;
    return next(err);
  }
  next();
};


module.exports = { createBookValidation   , updateBookValidation, validateId};
