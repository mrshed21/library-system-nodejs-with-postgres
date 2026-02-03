const express = require('express');
const router = express.Router();
const { Authors } = require('../models/models');



// get all authors
router.get('/authors',async (req, res) => {
    try {
        const authors = await Authors.findAll();
        if(authors.length === 0) {
            return res.status(404).json({ error: 'No authors found' });
        }
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch authors' });
    }
});

// get author by id
router.get('/authors/:id',async (req, res) => {
    try {
        const author = await Authors.findByPk(req.params.id);
        if(!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.json(author);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch author' });
    }
});



// create author
router.post('/authors', (req, res) => {
    const { name, year_of_birth } = req.body;
    if(!name || !year_of_birth) {
        return res.status(400).json({ error: 'Name and year of birth are required' });
    }
    Authors.create({ name, year_of_birth })
    .then((author) => {
        res.status(201).json(author);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Unable to create author' , message: error.parent.message });
    });
});

// update author
router.put('/authors/:id',async (req, res) => {
    const { name, year_of_birth } = req.body;
    try {
        const author = await Authors.findByPk(req.params.id);
        if(!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        await author.update({ name, year_of_birth });
        res.json({message: 'Author updated', author});
    } catch (error) {
        res.status(500).json({ error: 'Unable to update author', message: error.parent.message });
    }
});

// delete author
router.delete('/authors/:id',async (req, res) => {
    try {
        const author = await Authors.findByPk(req.params.id);
        if(!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        await author.destroy();
        res.json({ message: 'Author deleted', author });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete author', message: error.parent.message });
    }
});




module.exports = router;