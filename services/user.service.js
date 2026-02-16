const { Users ,Books ,FavoriteBooks } = require("../models/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get all users
exports.getUsers = async () => {
    const users = await Users.findAll({
        attributes: ["id", "name", "email", "role", "isActive"]
    });
    
    if (users.length === 0) {
        const error = new Error('no users found');
        error.status = 404;
        throw error;
    }
    return { 
        success: true, 
        message: 'Users fetched successfully',
        data: users 
    };
};

// get user by id
exports.getUserById = async (id) => {
    const user = await Users.findByPk(id , {
        attributes: [ "id", "name", "email", "role", "isActive"]
    });
    if (!user) {
        const error = new Error('user not found');
        error.status = 404;
        throw error;
    }
    return {
        success: true,
        message: 'User fetched successfully',
        data: user
    };
};



// update user
exports.updateUser = async (id, user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    const [, [updated]] = await Users.update(user, {
        where: {
            id: id
        },
        returning: true
    });
    if (!updated) {
        const error = new Error('user not found');
        error.status = 404;
        throw error;
    }
const { name, email, role, isActive , password} = updated;

    return {
        success: true,
        message: 'User updated successfully',
        data: {id ,name,email,role,isActive,password}
    };
};

// delete user
exports.deleteUser = async (id) => {
    const deletedUser = await Users.destroy({
        where: {
            id: id
        }
    });
    if (deletedUser === 0) {
        const error = new Error('user not found');
        error.status = 404;
        throw error;
    }
    return {
        success: true,
        message: 'User deleted successfully',
        data: deletedUser
    };
};


exports.getFavoriteBooks = async (id) => {
    const favoriteBooks = await Users.findByPk(id, {
        include: [{
            model: Books,
            as: 'Favorites',
            through: { attributes: [] }
        }]
    });
    if (!favoriteBooks) {
        const error = new Error('favorite books not found');
        error.status = 404;
        throw error;
    }
    if (favoriteBooks.Favorites.length === 0) {
        const error = new Error('no favorite books found');
        error.status = 404;
        throw error;
    }
    const favoriteBooksData = favoriteBooks.Favorites.map(book => book.toJSON());
    return favoriteBooksData;
};

exports.addFavoriteBook = async (id, book_id) => {
    const [favoriteBook, created] = await FavoriteBooks.findOrCreate({
        where: {
            user_id: id,
            book_id: book_id
        }
    });
    if (!created) {
        const error = new Error('favorite book is already in your favorites');
        error.status = 400;
        throw error;
    }
    const book = await Books.findByPk(book_id);
    if (!book) {
        const error = new Error('book not found');
        error.status = 404;
        throw error;
    }
    return book ;
};

exports.deleteFavoriteBook = async (id, book_id) => {
    const favoriteBook = await FavoriteBooks.findOne({
        where: {
            user_id: id,
            book_id: book_id
        }
    });
    if (!favoriteBook) {
        const error = new Error('favorite book not found');
        error.status = 404;
        throw error;
    }
    await favoriteBook.destroy();
    return favoriteBook;
};