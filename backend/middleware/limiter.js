const limiter = require('express-rate-limit');

exports.loginLimiter =  limiter({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    handler: (req, res, next) => {
        const error = new Error('Too many login attempts from this IP, please try again after 15 minutes');
        error.status = 429;
        next(error);
    }
});

exports.refreshLimiter = limiter({
    windowMs : 60 * 60 * 1000,
    max : 10 , 
    keyGenerator: (req) => {
        if (req.user && req.user.id) return req.user.id;
        return req.ip; // fallback
    },
    handler: (req, res, next) => {
    const error = new Error("Too many refresh requests");
    error.status = 429;
    next(error);
    }
});


exports.defaultLimiter = limiter({
    windowMs: 15 * 60 * 1000, 
    max: 100,   
    handler: (req, res, next) => {
        const error = new Error('Too many requests from this IP, please try again after 15 minutes');
        error.status = 429;
        next(error);
    }
})
