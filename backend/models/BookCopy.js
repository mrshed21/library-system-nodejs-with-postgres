const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize.config");

const BookCopy = sequelize.define(
  "BookCopy",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Books",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("AVAILABLE", "BORROWED", "DAMAGED", "LOST"),
      allowNull: false,
      defaultValue: "AVAILABLE",
    },
    shelfLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    barcode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "book_copies",
    timestamps: true,
    paranoid: true,
  },
);

const generateBarcode = async (bookCopy) => {
  const count = await BookCopy.count({
    where: { book_id: bookCopy.book_id },
  });
  const nextNumber = count + 1;
  bookCopy.barcode = `LIB-${bookCopy.book_id}-${String(nextNumber).padStart(3, "0")}`;
};

// generate barcode for a single copy
BookCopy.beforeCreate(async (copy, options) => {
  if (!copy.barcode) {
    await generateBarcode(copy);
  }
});

// generate barcode for multiple copies at once
BookCopy.beforeBulkCreate(async (bookCopies, options) => {
  for (const copy of bookCopies) {
    if (!copy.barcode) {
      await generateBarcode(copy);
    }
  }
});

module.exports = BookCopy;
