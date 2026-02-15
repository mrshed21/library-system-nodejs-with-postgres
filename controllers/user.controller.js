const userService = require('../services/user.service');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};
exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
};