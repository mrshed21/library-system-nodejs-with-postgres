const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Books = require("./books");
const Genres = require("./genres");

//TODO implement the BookGenres model

const BookGenre = sequelize.define(
  "book_genre",
   {},
  {
    tableName: "book_genres",
    timestamps: false
  }
);

module.exports = BookGenre;







