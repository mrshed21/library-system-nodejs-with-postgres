const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize.config");

const Books = sequelize.define(
  "Books",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull:true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Authors",
        key: "id",
      },
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    publication_year: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
      cover_image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      edition: {
        type: DataTypes.STRING,
        allowNull: true,
      },


  },
  {
    tableName: "Books",
    timestamps: true,
    paranoid: true,
  },
);

module.exports = Books;
