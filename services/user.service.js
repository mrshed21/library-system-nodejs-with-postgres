const { Users } = require("../models/models");
const bcrypt = require("bcryptjs");

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

// create user
exports.createUser = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await Users.create({
        ...user,
        password: hashedPassword
    });


    const {id, name, email, role, isActive} = newUser;
    return {
        success: true,
        message: 'User created successfully',
        data:   {id,name,email,role,isActive}
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
