const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('./config/sequelize');



const authorsRouter = require('./routes/Authors');
const booksRouter = require('./routes/Books');
const genresRouter = require('./routes/Genres');


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});



app.use('/api', booksRouter);


app.use('/api', authorsRouter);
app.use('/api', genresRouter);


app.use((req, res, next) => {
    res.status(404).json({ error: 'Not found' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});



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