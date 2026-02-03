const express = require('express');
const router = express.Router();
const { Genres } = require('../models/models');




router.get('/genres',async (req, res) => {
    try {
        const allGenres = await Genres.findAll();
        console.log(allGenres)
        if(allGenres.length === 0) {
            return res.status(404).json({ error: 'No genres found' });
        }
        res.json(allGenres);
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({ error: 'Unable to fetch genres', details: error.message });
    }
});

module.exports = router;