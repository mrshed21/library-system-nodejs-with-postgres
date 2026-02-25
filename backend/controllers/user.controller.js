const userService = require('../services/user.service');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        res.json({
            success: true,
            message: 'Users fetched successfully',
            data: users
        });
    } catch (error) {
        next(error);
    }
};
exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json({
            success: true,
            message: 'User fetched successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};


// update user by user.id
exports.updateUser = async (req, res, next) => {
    const userId = req.user.id;
    const { name , email  } = req.body;
    try {
        const user = await userService.updateUser(userId, { name , email });
        res.json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.json({
            success: true,
            message: 'User deleted successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};



exports.getFavoriteBooks = async (req, res, next) => {
    try {
        const favoriteBooks = await userService.getFavoriteBooks(req.user.id);
        res.json({
            success: true,
            message: 'Favorite books fetched successfully',
            count: favoriteBooks?.length || 0,
            data: favoriteBooks
        });
    } catch (error) {
        next(error);
    }
};

exports.addFavoriteBook = async (req, res, next) => {
    try {
        const { book_id } = req.body;   
        if (!book_id) {
            const error = new Error('Book ID is required');
            error.status = 400;
            throw error;
        }
        const favoriteBook = await userService.addFavoriteBook(req.user.id, book_id);
        
        res.json({
            success: true,
            message: 'Favorite book added successfully',
            data:  favoriteBook 
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteFavoriteBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        if (!bookId) {
            const error = new Error('Book ID is required');
            error.status = 400;
            throw error;
        }
        const deletedFavoriteBook = await userService.deleteFavoriteBook(req.user.id, bookId);
        res.json({
            success: true,
            message: 'Favorite book deleted successfully',
            data: { message: 'Favorite book deleted successfully' , deletedFavoriteBook}
        });
    } catch (error) {
        next(error);
    }
};