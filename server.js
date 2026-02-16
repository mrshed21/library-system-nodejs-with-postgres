const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('./config/sequelize');
const helmet = require('helmet');

const { defaultLimiter } = require('./middleware/limiter');



const authorsRouter = require('./routes/Authors');
const booksRouter = require('./routes/Books');
const genresRouter = require('./routes/Genres');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');


const errorHandler = require('./middleware/errorHandler');        

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