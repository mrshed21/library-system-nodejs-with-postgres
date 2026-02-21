const express = require('express');
const { validateId } = require('../middleware/idParamValidation');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const bookCopyController = require('../controllers/bookCopy.controller');

const validate = require('../middleware/validate');
const { createBookSchema, updateBookSchema } = require('../schemas/book.schema');
const { createBookCopySchema, updateBookCopySchema } = require('../schemas/bookCopy.schema');

// create book
router.post('/books', validate(createBookSchema), bookController.createBook)

// update book
router.put('/books/:id', validateId, validate(updateBookSchema), bookController.updateBook)

// delete book
router.delete('/books/:id', validateId, bookController.deleteBook)


// create book copy
router.post('/book-copies', validate(createBookCopySchema), bookCopyController.createBookCopy)

// update book copy
router.put('/book-copies/:id', validateId, validate(updateBookCopySchema), bookCopyController.updateBookCopy)

// delete book copy
router.delete('/book-copies/:id', validateId, bookCopyController.deleteBookCopy)


// get all book copies
router.get('/book-copies', bookCopyController.getAllBookCopiesWithBook)

// get book copy by id
router.get('/book-copies/:id', validateId,  bookCopyController.getBookCopyById )


module.exports = router;