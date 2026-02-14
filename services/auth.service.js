const { Users } = require("../models/models");
const bcrypt = require("bcryptjs");

// login user
exports.loginUser = async (user) => {
    const { email, password } = user;
   

    const existingUser = await Users.findOne({
        where: {
            email: email
        },
        attributes: ['id', 'name', 'email', 'password', 'role', 'isActive', 'createdAt', 'updatedAt']
    });

    if (!existingUser) {
        const error = new Error('Invalid username or password');
        error.status = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        const error = new Error('Invalid username or password');
        error.status = 401;
        throw error;
    }

    const userData = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        isActive: existingUser.isActive
    };

    return {
        success: true,
        message: 'User logged in successfully',
        data: userData
    };

};