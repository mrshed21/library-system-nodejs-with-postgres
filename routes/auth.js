const express = require('express');
const router = express.Router();

const { loginUserSchema } = require('../schemas/user.schema');
const { createUserSchema } = require('../schemas/user.schema');

const validate = require('../middleware/validate');
const authController = require('../controllers/auth.controller');

// create user
router.post('/auth/register', validate(createUserSchema), authController.createUser);



// login user
router.post('/auth/login', validate(loginUserSchema), authController.loginUser);

// refresh token
router.post('/auth/refresh', authController.refreshToken);

// logout user
router.post('/auth/logout', authController.logoutUser);

module.exports = router;