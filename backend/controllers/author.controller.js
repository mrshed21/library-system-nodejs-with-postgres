const authorService = require('../services/authors.service');

// get all authors
exports.getAuthors = async (req, res, next) => {
    try {
        const authors = await authorService.getAuthors();
        res.json({
            success: true,
            message: 'Authors fetched successfully',
            data: authors
        });
    } catch (error) {
        next(error);
    }
};

// get author by id
exports.getAuthorById = async (req, res, next) => {
    try {
        const author = await authorService.getAuthorById(req.params.id);
        res.json({
            success: true,
            message: 'Author fetched successfully',
            data: author
        });
    } catch (error) {
        next(error);
    }
};

// create author
exports.createAuthor = async (req, res, next) => {
    const { name, year_of_birth } = req.body;
    if(!name || !year_of_birth) {
        const error = new Error('Name and year of birth are required');
        error.statusCode = 400;
        throw error;
    }
    try {
        const author = await authorService.createAuthor(name , year_of_birth);
        res.json({
            success: true,
            message: 'Author created successfully',
            data: author
        });
    } catch (error) {
        next(error);
    }
};

// update author
exports.updateAuthor = async (req, res, next) => {
    const { name, year_of_birth } = req.body; 
    if (!name && !year_of_birth) {
        const error = new Error('No data to update');
        error.statusCode = 400;
        throw error;
    }
    try {
        const author = await authorService.updateAuthor(req.params.id, {name , year_of_birth});
        res.json({
            success: true,
            message: 'Author updated successfully',
            data: author
        });
    } catch (error) {
        next(error);
    }
};

// delete author
exports.deleteAuthor = async (req, res, next) => {
    try {
        const author = await authorService.deleteAuthor(req.params.id);
        res.json({
            success: true,
            message: 'Author deleted successfully',
            data: author
        });
    } catch (error) {
        next(error);
    }
};



