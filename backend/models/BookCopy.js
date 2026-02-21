const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const Books = require("./Books");
const BookCopy = sequelize.define("BookCopy", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Books,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    conditionStatus: {
        type: DataTypes.ENUM('BORROWED', 'AVAILABLE', 'DAMAGED', 'LOST'),
        allowNull: false,
        defaultValue: 'AVAILABLE',
      },
      shelfLocation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  
},
    {
        tableName: "book_copies",
        timestamps: true,
    }
);

Books.hasMany(BookCopy, { foreignKey: 'book_id', onDelete: 'CASCADE' });

module.exports = BookCopy;