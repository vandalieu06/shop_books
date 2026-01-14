const bookService = require("../services/bookService.js");

const getBook = async (req, res) => {
	try {
		const book = await bookService.getBook(req.params.id);
		res.status(200).json({ status: "success", data: book });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const getAllBooks = async (req, res) => {
	try {
		const books = await bookService.getAllBooks();
		console.log("GET / - Exito");
		res.status(200).json({ status: "success", data: books });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const createBook = async (req, res) => {
	try {
		const product = await bookService.createBook(req.body);
		res.status(201).json({ status: "success", data: product });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const createManyBooks = async (req, res) => {
	try {
		const products = await bookService.createManyBooks(req.body);
		res.status(201).json({ status: "success", data: products });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

module.exports = {
	getBook,
	getAllBooks,
	createBook,
	createManyBooks,
};
