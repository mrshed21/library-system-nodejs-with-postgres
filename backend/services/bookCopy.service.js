const { BookCopy , Books } = require('../models/Index');

// get all bookCopy 
exports.getAllBookCopiesWithBook  = async (limit , offset) => {
    const bookCopy = await BookCopy.findAndCountAll({
        include: [
            {
                model: Books,
                attributes: ['name' , 'price'],
            },
        ],
        limit,
        offset
    })
    return { bookCopy , count: bookCopy.count }
}

// get bookCopy by id
exports.getBookCopyById = async (id) => {
    const bookCopy = await BookCopy.findByPk(id , {
        include: [
            {
                model: Books,
                attributes: ['name' , 'price'],

            }, 
        ],
    })
    if (!bookCopy) {
        const error = new Error('Book not found')
        error.status = 404
        throw error
    }
    return bookCopy
}

// create bookCopy
exports.createBookCopy = async (bookCopyData) => {
    const bookCopy = await BookCopy.create(bookCopyData)
    return bookCopy
}

// update bookCopy
exports.updateBookCopy = async (id, bookCopyData) => {
    const { book_id, conditionStatus, shelfLocation } = bookCopyData;
    const existBook = await BookCopy.findByPk(id)
    if (!existBook) {
        const error = new Error('Book not found')
        error.status = 404
        throw error
    }
    await existBook.update({ book_id, conditionStatus, shelfLocation })
    return existBook
}

// delete bookCopy
exports.deleteBookCopy = async (id) => {
    const bookCopy = await BookCopy.destroy({ where: { id } })
    if (!bookCopy) {
        const error = new Error('Book not found')
        error.status = 404
        throw error
    }
    return bookCopy
}
