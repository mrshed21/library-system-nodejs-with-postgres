const Authors = require('./authors');
const Books = require('./books');
const Genres = require('./genres');
const BookGenres = require('./bookGenres');

 

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
    };

module.exports = models;