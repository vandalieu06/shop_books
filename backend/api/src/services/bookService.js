const Book = require("../models/bookScheme.js");

const getBook = async (id) => {
  return await Book.findOne({ _id: id }, { _id: 0, __v: 0 });
};

const getAllBooks = async () => {
  return await Book.find({}, { _id: 0, __v: 0 });
};

const createBook = async (bookData) => {
  const newBook = new Book(bookData);
  return await newBook.save();
};

const createManyBooks = async (booksData) => {
  return await Book.insertMany(booksData);
};

module.exports = {
  getBook,
  getAllBooks,
  createBook,
  createManyBooks,
};
