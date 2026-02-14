const express = require('express');
const router = express.Router();

const { validateId } = require('../middleware/idParamValidation');
const userController = require('../controllers/user.controller');

const validate = require('../middleware/validate');
const { createUserSchema, updateUserSchema } = require('../schemas/user.schema');

// get all users
router.get('/users', userController.getUsers);

// get user by id
router.get('/users/:id', validateId, userController.getUserById);

// create user
router.post('/users', validate(createUserSchema), userController.createUser);

// update user
router.put('/users/:id', validateId, validate(updateUserSchema), userController.updateUser);

// delete user
router.delete('/users/:id', validateId, userController.deleteUser);



module.exports = router;