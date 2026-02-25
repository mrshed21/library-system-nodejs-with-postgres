const { Authors } = require("../models/Index");

// get all authors
exports.getAuthors = async () => {
  const authors = await Authors.findAll();
  return authors;
};

// get author by id
exports.getAuthorById = async (id) => {
  const author = await Authors.findByPk(id);
  if (!author) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }
  return author;
};

// create an author
exports.createAuthor = async (name, year_of_birth) => {
  const newAuthor = await Authors.create({ name, year_of_birth });
  return newAuthor;
};

// update author
exports.updateAuthor = async (id, data) => {
  const allowedFields = ["name", "year_of_birth"];
  const filteredData = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      filteredData[field] = data[field];
    }
  });

  const author = await Authors.findByPk(id);
  if (!author) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }
  await author.update(filteredData);
  return author;
};

exports.deleteAuthor = async (id) => {
  const author = await Authors.findByPk(id);
  if (!author) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }
  await author.destroy();
  return { message: "Author deleted", author };
};
