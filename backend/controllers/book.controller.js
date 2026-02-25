const bookService = require("../services/book.service");

// Get all books with pagination and filtering
exports.getBooks = async (req, res, next) => {
  try {
    const books = await bookService.getBooks(req.query);
    res.json({
      success: true,
      message: "Books fetched successfully",
      data: books.data,
      meta: {
        total: books.meta.total,
        page: books.meta.page,
        limit: books.meta.limit,
        totalPages: books.meta.totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get book by id
exports.getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.json({
      success: true,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// Create book
exports.createBook = async (req, res, next) => {
  try {
    const { name, price, author_id, genre_ids } = req.body;

    const book = await bookService.createBook({
      name,
      price,
      author_id,
      genre_ids,
    });

    res.json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// Update book
exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, author_id, genre_ids } = req.body;
    const updatedBook = await bookService.updateBook(id, {
      name,
      price,
      author_id,
      genre_ids,
    });
    res.json({ 
        success: true, 
        message: "Book updated", 
        data: updatedBook 
    });
  } catch (error) {
    next(error);
  }
};


// delete book by id
exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookService.deleteBook(id);
    res.json({ 
        success: true, 
        message: "Book deleted", 
        data: deletedBook 
    });
  } catch (error) {
    next(error);
  }
};
