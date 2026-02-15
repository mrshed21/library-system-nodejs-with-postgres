const express = require('express');
const router = express.Router();

const {  validateId } = require('../middleware/idParamValidation');
const bookController = require('../controllers/book.controller');

const validate = require('../middleware/validate');
const { createBookSchema, updateBookSchema } = require('../schemas/book.schema');

const { authMiddleware ,adminonly } = require('../middleware/auth');


// get all books
router.get('/books', bookController.getBooks);

// get book by id
router.get('/books/:id', validateId,  bookController.getBookById )

// create book
router.post('/books',authMiddleware,adminonly, validate(createBookSchema), bookController.createBook)

// update book
router.put('/books/:id',authMiddleware,adminonly, validateId, validate(updateBookSchema), bookController.updateBook)

// delete book
router.delete('/books/:id',authMiddleware,adminonly, validateId, bookController.deleteBook)

module.exports = router;