const express = require('express');
const router = express.Router();

const { validateId } = require('../middleware/idParamValidation');
const userController = require('../controllers/user.controller');

const validate = require('../middleware/validate');
const { createUserSchema, updateUserSchema } = require('../schemas/user.schema');
const { createFavoriteBookSchema } = require('../schemas/favoriteBook.schema');
const { authMiddleware, adminonly } = require('../middleware/auth');

const { checkOwnershipOrAdmin } = require('../middleware/checkOwnershipOrAdmin');

// get all users
router.get('/users',authMiddleware, adminonly, userController.getUsers);

// get user by id
router.get('/users/:id',authMiddleware,adminonly ,  validateId, userController.getUserById);



// update user
router.put('/users/:id',authMiddleware, checkOwnershipOrAdmin, validateId, validate(updateUserSchema), userController.updateUser);

// delete user
router.delete('/users/:id',authMiddleware, checkOwnershipOrAdmin, validateId, userController.deleteUser);



// favorite book
router.get('/users/me/favorite-books',authMiddleware, userController.getFavoriteBooks);

router.post('/users/me/favorite-books',authMiddleware,validate(createFavoriteBookSchema), userController.addFavoriteBook);


router.delete('/users/me/favorite-books/:bookId',authMiddleware, userController.deleteFavoriteBook); 

module.exports = router;