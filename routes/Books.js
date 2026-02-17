const express = require('express');
const router = express.Router();

const {  validateId } = require('../middleware/idParamValidation');
const bookController = require('../controllers/book.controller');


// get all books
router.get('/books', bookController.getBooks);

// get book by id
router.get('/books/:id', validateId,  bookController.getBookById )




module.exports = router;