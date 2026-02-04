const bookService = require('../services/book.service');

exports.getBooks = async (req, res, next) => {
    try {

        const books = await bookService.getBooks(req.query);
        res.json(books);
    } catch (error) {
        next(error)
    }
}

exports.getBookById = async (req, res   , next) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        res.json(book);
    } catch (error) {
        next(error)
    }
}

exports.createBook = async (req, res, next) => {
    try {
    const { name, price, stock, author_id, genre_ids } = req.body;
    
    const book = await bookService.createBook({ name, price, stock, author_id, genre_ids });
    
    res.json(book); 
    } catch (error) {
        next(error)
    }
}


exports.updateBook = async (req , res, next) => {
    try {
        const { id } = req.params;
        const { bookData } = req.body;
        const updatedBook = await bookService.updateBook(id, bookData);
        res.json({ success: true, message: 'Book updated', data: updatedBook });
    } catch (error) {
        next(error)
    }
}

exports.deleteBook = async (req ,res , next) => {
    try {
            const { id } = req.params;
            const deletedBook = await bookService.deleteBook(id);
            res.json({ success: true, message: 'Book deleted', data: deletedBook });
    } catch (error) {
        next(error)
    }
}