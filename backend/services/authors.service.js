const { Authors } = require('../models/Index');

exports.getAuthors = async () => {
    const authors = await Authors.findAll();
    return authors;
}

exports.getAuthorById = async (id) => {
    
        const author = await Authors.findByPk(id);
        if(!author) {
            const error = new Error('Author not found');
            error.statusCode = 404;
            throw error;
        }
        return author;
    
}


exports.createAuthor = async (body) => {
    const { name, year_of_birth } = body;
    const newAuthor = await Authors.create({ name, year_of_birth });
    return newAuthor;
}

exports.updateAuthor = async (id, body) => {
    const { name, year_of_birth } = body;
   
        const author = await Authors.findByPk(id);
        if(!author) {
            const error = new Error('Author not found');
            error.statusCode = 404;
            throw error;
        }
        await author.update({ name, year_of_birth });
        return author;
}

exports.deleteAuthor = async (id) => {
        const author = await Authors.findByPk(id);
        if(!author) {
            const error = new Error('Author not found');
            error.statusCode = 404;
            throw error;
        }
        await author.destroy();
        return { message: 'Author deleted', author };
   
}