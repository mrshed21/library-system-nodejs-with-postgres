const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/sequelize.config");

const Books = sequelize.define(
  "Books",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
      
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      require: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Authors",
        key: "id",
      },
    },
  },
  {
    tableName: "Books",
    timestamps: true,
    paranoid: true,
  },
);


module.exports = Books;
