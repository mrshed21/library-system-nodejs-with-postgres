const {sequelize} = require("../config/sequelize.config");


//TODO implement the BookGenres model

const BookGenre = sequelize.define(
  "book_genre",
   {},
  {
    tableName: "book_genres",
    timestamps: false,
    
  }
);

module.exports = BookGenre;







