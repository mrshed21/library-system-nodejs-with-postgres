const jwt = require('jsonwebtoken');


exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        const error = new Error('No token found');
        error.status = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1]; 
    if (!token) {
        const error = new Error('invalid token format');
        error.status = 401;
        throw error;
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken 
        next();
    } catch (err) {
        const error = new Error(' token invalid or expired');
        error.status = 401;
        throw error;
    }
}

exports.adminonly =(req , res , next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    }
    next();
}