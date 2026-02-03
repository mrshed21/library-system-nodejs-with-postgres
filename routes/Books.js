const express = require('express');
const router = express.Router();
const { Books, Authors , Genres } = require('../models/models');



// get all books
router.get('/books',async (req, res) => {
    const books = await Books.findAll({
        include: [{
            model: Authors,
            attributes: ['id', 'name']
        },
        {
            model: Genres,
          through: { attributes: [] } 
        }],
        
    });
    if(books.length === 0) {
        return res.status(404).json({ error: 'No books found' });
    }
    res.json(books);
});




// get book by id
router.get('/books/:id' , async (req , res) => {
    const book = await Books.findByPk(req.params.id , {
        include: [{
            model: Authors,
            attributes: ['id', 'name']
        },
        {
            model: Genres,
          through: { attributes: [] } 
        }]
    });
    if(!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
})

// create book
router.post('/books', async (req, res) => {
    const { name, price, stock, author_id , genre_ids } = req.body;
    try {
        if(!name || !price || !stock || !author_id || !genre_ids) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const author = await Authors.findByPk(author_id);
        if(!author) {
            return res.status(404).json({ error: 'Author not found' });
        }   
        const book = await Books.create({ name, price, stock, author_id });
        if (genre_ids && genre_ids.length > 0) {
            await book.setGenres(genre_ids);
        }
        res.json(book);
    } catch (error) {
        res.status(400).json({ error: error.message , details: error.errors });
    }
})

// update book
router.put('/books/:id', async (req, res) => {
    const { name, price, stock, author_id , genre_ids } = req.body;
    try {
        
        const book = await Books.findByPk(req.params.id);
        if(!book) {
            return res.status(404).json({ error: 'Book not found' });
        }   
        const updatedBook = await Books.update({ name, price, stock, author_id }, {
            where: {
                id: req.params.id
            }
        });
         if (genre_ids && genre_ids.length > 0) {
            await book.setGenres(genre_ids);
        }
        res.json({message: 'Book updated', book});
    } catch (error) {
        res.status(400).json({ error: error.message , details: error.errors });
    }
})

// delete book
router.delete('/books/:id', async (req, res) => {
    try {
        const book = await Books.findByPk(req.params.id);
        if(!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        await book.destroy();
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message , details: error.errors });
    }

})




module.exports = router;