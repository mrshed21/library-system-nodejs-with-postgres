const express = require('express');
const router = express.Router();

const { validateId } = require('../middleware/idParamValidation');
const bookCopyController = require('../controllers/bookCopy.controller');
const validate = require('../middleware/validate');
const { createBookCopySchema, updateBookCopySchema } = require('../schemas/bookCopy.schema');
const { authMiddleware, adminonly } = require('../middleware/auth');

router.get('/book-copies', authMiddleware, adminonly, bookCopyController.getAllBookCopiesWithBook);
router.get('/book-copies/:id', authMiddleware, adminonly, validateId, bookCopyController.getBookCopyById);
router.post('/book-copies', authMiddleware, adminonly, validate(createBookCopySchema), bookCopyController.createBookCopy);
router.put('/book-copies/:id', authMiddleware, adminonly, validateId, validate(updateBookCopySchema), bookCopyController.updateBookCopy);
router.delete('/book-copies/:id', authMiddleware, adminonly, validateId, bookCopyController.deleteBookCopy);

module.exports = router;
