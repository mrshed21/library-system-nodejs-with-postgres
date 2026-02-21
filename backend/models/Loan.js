const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/sequelize.config");

const Loan = sequelize.define(
  "Loan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    book_copy_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "book_copies",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("borrowed", "returned", "overdue"),
      allowNull: false,
      defaultValue: "borrowed",
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fine: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "loans",
    timestamps: true,
    paranoid: true,
  },
);




module.exports = Loan;