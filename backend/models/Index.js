const Authors = require("./authors");
const Books = require("./Books");
const Genres = require("./genres");
const BookGenres = require("./bookGenres");
const Users = require("./Users");
const RefreshToken = require("./RefreshToken");
const FavoriteBooks = require("./FavoriteBooks");
const BookCopy = require("./BookCopy");
const Loan = require("./Loan");


// Authors-Books relationship
Books.belongsTo(Authors, { foreignKey: "author_id", onDelete: "CASCADE" });
Authors.hasMany(Books, { foreignKey: "author_id" });



// Books-Genres relationship
Books.belongsToMany(Genres, {
  through: BookGenres,
  foreignKey: "book_id",
  otherKey: "genre_id",
});

Genres.belongsToMany(Books, {
  through: BookGenres,
  foreignKey: "genre_id",
  otherKey: "book_id",
});


// Users-Books relationship (favorites)
Users.belongsToMany(Books, {
  through: FavoriteBooks,
  as: "Favorites",
  foreignKey: "user_id",
});
Books.belongsToMany(Users, {
  through: FavoriteBooks,
  as: "FavoredBy",
  foreignKey: "book_id",
});

// Books-BookCopy relationship
BookCopy.belongsTo(Books, { foreignKey: "book_id", onDelete: "CASCADE" });
Books.hasMany(BookCopy, { foreignKey: "book_id", onDelete: "CASCADE" });

// Users-Loan relationship
Loan.belongsTo(Users, { foreignKey: "user_id", onDelete: "CASCADE" });
Users.hasMany(Loan, { foreignKey: "user_id" });

// BookCopy-Loan relationship
Loan.belongsTo(BookCopy, { foreignKey: "book_copy_id", onDelete: "CASCADE" });
BookCopy.hasMany(Loan, { foreignKey: "book_copy_id" });


// Users-RefreshToken relationship
Users.hasMany(RefreshToken, { foreignKey: "user_id", onDelete: "CASCADE" });
RefreshToken.belongsTo(Users, { foreignKey: "user_id" });


const models = {
  Authors,
  Books,
  Genres,
  BookGenres,
  Users,
  RefreshToken,
  FavoriteBooks,
  BookCopy,
  Loan,
};

module.exports = models;
