const express = require('express');
const router = express.Router();


const authorsRouter = require('../routes/authors.routes');
const booksRouter = require('../routes/books.routes');
const genresRouter = require('../routes/genres.routes');
const usersRouter = require('../routes/users.routes');
const authRouter = require('../routes/auth.routes');
const adminRouter = require('../routes/admin.routes');
const loanRouter = require('../routes/loanRoute.routes');


const { defaultLimiter } = require('../middleware/limiter');
const { authMiddleware,adminonly } = require('../middleware/auth');
const errorHandler = require('../middleware/errorHandler');        


const path = require('path');



router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

router.use('/api', defaultLimiter);
router.use('/api', booksRouter);
router.use('/api', authorsRouter);
router.use('/api', genresRouter);
router.use('/api', usersRouter);
router.use('/api', loanRouter);

router.use('/api/admin',authMiddleware, adminonly, adminRouter);
router.use('/api', authRouter);



router.use((req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.status = 404;
    next(error);
});


router.use(errorHandler);



module.exports = router;