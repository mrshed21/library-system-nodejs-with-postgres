const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author.controller');

// get all authors
router.get('/authors', authorController.getAuthors);

// get author by id
router.get('/authors/:id', authorController.getAuthorById);

// create author
router.post('/authors', authorController.createAuthor);

// update author
router.put('/authors/:id', authorController.updateAuthor);

// delete author
router.delete('/authors/:id', authorController.deleteAuthor);

module.exports = router;