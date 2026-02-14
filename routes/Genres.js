const express = require('express');
const router = express.Router();

const { validateId } = require('../middleware/idParamValidation');
const validate = require('../middleware/validate');
const { createGenreSchema, updateGenreSchema } = require('../schemas/genre.schema');



const genreController = require('../controllers/genre.controller');

// Get all genres
router.get('/genres', genreController.getGenres );

// get genre by id
router.get('/genres/:id', validateId, genreController.getGenreById);

// create new genre
router.post('/genres', validate(createGenreSchema), genreController.createGenre);

// update genre by id
router.put('/genres/:id', validateId, validate(updateGenreSchema), genreController.updateGenre);

// delete genre by id
router.delete('/genres/:id', validateId, genreController.deleteGenre);

module.exports = router;