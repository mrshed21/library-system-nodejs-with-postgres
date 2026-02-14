const Authors = require('./authors');
const Books = require('./books');
const Genres = require('./genres');
const BookGenres = require('./bookGenres');
const Users = require('./Users');

 

Books.belongsToMany(Genres, {
  through: BookGenres,
  foreignKey: "book_id",
  otherKey: "genre_id"
});

Genres.belongsToMany(Books, {
  through: BookGenres,
  foreignKey: "genre_id",
  otherKey: "book_id"
});



const models = {
    Authors,
    Books,
    Genres,
    BookGenres,
    Users
};

module.exports = models;