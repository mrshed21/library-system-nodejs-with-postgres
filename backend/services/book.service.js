const { Books, Authors, Genres } = require("../models/Index");


// get all books
exports.getBooks = async (query) => {
    const { page = 1, limit = 10, authorId } = query;
    const whereClause = {};
    if (authorId) {
        whereClause.author_id = authorId;
    }
    const offset = (page - 1) * limit;
    const { rows: data, count: total } = await Books.findAndCountAll({
        where: whereClause,
        include: [{
            model: Authors,
            attributes: ['id', 'name']
        },
        {
            model: Genres,
            through: { attributes: [] }
        }],
        distinct: true,
        limit: limit,
        offset: offset,
        order: [['id', 'ASC']]

    });
    if (data.length === 0) {
        const error =  new Error('No books found');
        error.status = 404;
        throw error;
    }
    return {
       
        data,
        meta: {
            total: total,
            page: page,
            limit: limit,
            totalPages: Math.ceil(total / limit)
        }
    }
}

// get book by id
exports.getBookById = async (id) => {
    const book = await Books.findByPk(id, {
        include: [{
            model: Authors,
            attributes: ['id', 'name']
        },
        {
            model: Genres,
            through: { attributes: [] }
        }]
    });
    if (!book) {
        const error = new Error('Book not found');
        error.status = 404;
        throw error;
    }
    return book;
}


// create book
exports.createBook = async (bookData) => {
    const { name, price,  author_id, genre_ids } = bookData;

        const existingBook = await Books.findOne({
            where: {
                name: name
            }
        });
        if (existingBook) {
            const error = new Error('Book already exists');
            error.status = 400;
            throw error;
        }
    
        const author = await Authors.findByPk(author_id);
        if (!author) {
            const error = new Error('Author not found');
            error.status = 404;
            throw error;
        }
        const book = await Books.create({ name, price,  author_id });
        if (genre_ids && genre_ids.length > 0) {
            await book.setGenres(genre_ids);
        }
        return book;
    
}

// update book
exports.updateBook = async (id, bookData) => {
    const { name, price,  author_id, genre_ids } = bookData;
    const book = await Books.findByPk(id);
    if (!book) {
        const error = new Error('Book not found');
        error.status = 404;
        throw error;
    }
    await book.update({ name, price,  author_id });

    if (Array.isArray(genre_ids) && genre_ids.length > 0) {
        await book.setGenres(genre_ids);
    }
    return book;
}


// delete book

exports.deleteBook = async (id) => {

    const book = await Books.findByPk(id);
    if (!book) {
        const error = new Error('Book not found');
        error.status = 404;
        throw error; 
    }
    await book.destroy();
    return book;
}
