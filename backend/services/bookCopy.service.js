const { BookCopy , Books } = require('../models/Index');

// get all bookCopy 
exports.getAllBookCopiesWithBook  = async (limit , offset) => {
    const { rows: bookCopy, count } = await BookCopy.findAndCountAll({
        include: [
            {
                model: Books,
                attributes: ['id', 'title'],
            },
        ],
        limit,
        offset
    })
    return { bookCopy , count }
}

// get bookCopy by id
exports.getBookCopyById = async (id) => {
    const bookCopy = await BookCopy.findByPk(id , {
        include: [
            {
                model: Books,
                attributes: ['id', 'title'],
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

// generate barcode for a book copy
const generateBarcode = async (bookCopy) => {
  const count = await BookCopy.count({
    where: { book_id: bookCopy.book_id },
  });
  const nextNumber = count + 1;
  bookCopy.barcode = `LIB-${bookCopy.book_id}-${String(nextNumber).padStart(3, "0")}`;
};

// create bookCopy
exports.createBookCopy = async (bookCopyData) => {
    const { book_id, status, shelfLocation, notes } = bookCopyData;
    const existBook = await Books.findByPk(book_id)
    if (!existBook) {
        const error = new Error('Book not found')
        error.status = 404
        throw error
    }
  // if bookCopyData is an array, we need to generate barcode for each copy before creating them
  if (Array.isArray(bookCopyData)) {
    
    for (const copy of bookCopyData) {
      if (!copy.barcode) {
        await generateBarcode(copy);
      }
    }


    const copies = await BookCopy.bulkCreate(bookCopyData, { individualHooks: true });
    return copies;
  } else {
    // if it's a single copy, we can generate barcode directly
    if (!bookCopyData.barcode) {
      await generateBarcode(bookCopyData);
    }

    const copy = await BookCopy.create(bookCopyData);
    return copy;
  }
};

// update bookCopy
exports.updateBookCopy = async (id, bookCopyData) => {
    const { book_id, status, shelfLocation, notes } = bookCopyData;
    const existBook = await BookCopy.findByPk(id)
    if (!existBook) {
        const error = new Error('Book not found')
        error.status = 404
        throw error
    }
    await existBook.update({ book_id, status, shelfLocation, notes })
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
