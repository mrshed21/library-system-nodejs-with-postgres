const express = require('express');
const router = express.Router();
const { Genres } = require('../models/models');
const genreController = require('../controllers/genre.controller');

// Get all genres
router.get('/genres', genreController.getGenres );

// get genre by id
router.get('/genres/:id', genreController.getGenreById);

// create new genre
router.post('/genres', genreController.createGenre);

// update genre by id
router.put('/genres/:id', genreController.updateGenre);

// delete genre by id
router.delete('/genres/:id', genreController.deleteGenre);

module.exports = router;