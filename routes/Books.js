const express = require('express');
const router = express.Router();

const { createBookValidation , updateBookValidation, validateId } = require('../middleware/bookValidation');
const bookController = require('../controllers/book.controller');

// get all books
router.get('/books', bookController.getBooks);

// get book by id
router.get('/books/:id', validateId,  bookController.getBookById )

// create book
router.post('/books',createBookValidation, bookController.createBook)

// update book
router.put('/books/:id',updateBookValidation, validateId, bookController.updateBook)

// delete book
router.delete('/books/:id', validateId, bookController.deleteBook)

module.exports = router;