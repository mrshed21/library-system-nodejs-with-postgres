const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('./config/sequelize.config');
const helmet = require('helmet');

const { defaultLimiter } = require('./middleware/limiter');



const authorsRouter = require('./routes/authors.routes');
const booksRouter = require('./routes/books.routes');
const genresRouter = require('./routes/genres.routes');
const usersRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');
const adminRouter = require('./routes/admin.routes');
const loanRouter = require('./routes/loanRoute.routes');

const errorHandler = require('./middleware/errorHandler');        
const { authMiddleware,adminonly } = require('./middleware/auth');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(helmet());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});



app.use('/api', defaultLimiter);
app.use('/api', booksRouter);
app.use('/api', authorsRouter);
app.use('/api', genresRouter);
app.use('/api', usersRouter);
app.use('/api', loanRouter);



app.use('/api/admin',authMiddleware, adminonly, adminRouter);



app.use('/api', authRouter);




app.use((req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.status = 404;
    next(error);
});


app.use(errorHandler);



app.listen(port, () => {
    sequelize.authenticate()
    .then(() => {
        sequelize.sync()
        .then(() => {
            console.log('Database and tables created!');
        })
        .catch((error) => {
            console.error('Error syncing database:', error);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database or sync tables:', error);
    });
});