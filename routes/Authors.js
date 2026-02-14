const express = require('express');
const router = express.Router();


const validate = require('../middleware/validate');
const { validateId } = require('../middleware/idParamValidation');


const { createAuthorSchema, updateAuthorSchema } = require('../schemas/author.schema');

const authorController = require('../controllers/author.controller');

// get all authors
router.get('/authors', authorController.getAuthors);

// get author by id
router.get('/authors/:id', validateId, authorController.getAuthorById);

// create author
router.post('/authors', validate(createAuthorSchema), authorController.createAuthor);

// update author
router.put('/authors/:id', validateId, validate(updateAuthorSchema), authorController.updateAuthor);

// delete author
router.delete('/authors/:id', validateId, authorController.deleteAuthor);

module.exports = router;