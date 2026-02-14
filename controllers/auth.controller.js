const authService = require('../services/auth.service');

exports.loginUser = async (req, res, next) => {
    try {
        const user = await authService.loginUser(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};