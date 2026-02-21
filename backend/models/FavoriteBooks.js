const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const Users = require("./Users");
const Books = require("./Books");

const FavoriteBooks = sequelize.define(
  "FavoriteBooks",
  {
   
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: true, fields: ["user_id", "book_id"] }], 
  },
);



module.exports = FavoriteBooks;