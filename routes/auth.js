const express = require('express');
const router = express.Router();

const { loginUserSchema } = require('../schemas/user.schema');

const validate = require('../middleware/validate');
const authController = require('../controllers/auth.controller');

// login user
router.post('/auth/login', validate(loginUserSchema), authController.loginUser);

module.exports = router;