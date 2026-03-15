const bookCopyService = require('../services/bookCopy.service');

// get all bookCopy
exports.getAllBookCopiesWithBook = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const { bookCopy, count } = await bookCopyService.getAllBookCopiesWithBook(limit, offset);
        res.json({
            success: true , 
            message: 'bookCopies fetched successfully',
            data: bookCopy,
            meta: {
                limit,
                offset,
                total: count
            }

        });
    } catch (error) {
        next(error)
    }
}

// get bookCopy by id
exports.getBookCopyById = async (req, res, next) => {
    try {
        const bookCopy = await bookCopyService.getBookCopyById(req.params.id);
        res.json({
            success: true , 
            message: 'bookCopy fetched successfully',
            data: bookCopy
        });
    } catch (error) {
        next(error)
    }
}


// create bookCopy
exports.createBookCopy = async (req, res, next) => {
    try {
    const { book_id, status, shelfLocation, notes } = req.body;
    if (!book_id) {
        const error = new Error('Book ID is required');
        error.status = 400;
        throw error;
    }
    
    const bookCopy = await bookCopyService.createBookCopy({ book_id, status, shelfLocation, notes });
    
    res.json({ success: true, message: 'BookCopy created', data: bookCopy }); 
    } catch (error) {
        next(error)
    }
}


// update bookCopy
exports.updateBookCopy = async (req , res, next) => {
    try {
        const { id } = req.params;
        const { book_id, status, shelfLocation, notes } = req.body;
        const updatedBookCopy = await bookCopyService.updateBookCopy(id, { book_id, status, shelfLocation, notes });
        res.json({ success: true, message: 'BookCopy updated', data: updatedBookCopy     });
    } catch (error) {
        next(error)
    }
}

exports.deleteBookCopy = async (req ,res , next) => {
    try {
            const { id } = req.params;
            const deletedBookCopy = await bookCopyService.deleteBookCopy(id);
            res.json({ success: true, message: 'BookCopy deleted', data: deletedBookCopy });
    } catch (error) {
        next(error)
    }
}