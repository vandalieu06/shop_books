const bookService = require("../services/bookService.js");

const getBook = async (req, res) => {
	try {
		const book = await bookService.getBook(req.params.isbn);
		if (!book) {
			return res.status(404).json({ status: "error", message: "Libro no encontrado" });
		}
		res.status(200).json({ status: "success", data: book });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const getAllBooks = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const filters = {
			category: req.query.category,
			type: req.query.type,
			minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
			maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
			search: req.query.search,
			featured: req.query.featured === 'true'
		};

		const result = await bookService.getAllBooks(page, limit, filters);
		res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const searchBooks = async (req, res) => {
	try {
		const { q, page = 1, limit = 20 } = req.query;
		if (!q || q.trim().length < 2) {
			return res.status(400).json({ status: "error", message: "Query de búsqueda muy corta" });
		}
		const result = await bookService.searchBooks(q, parseInt(page), parseInt(limit));
		res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const getFeaturedBooks = async (req, res) => {
	try {
		const limit = parseInt(req.query.limit) || 8;
		const books = await bookService.getFeaturedBooks(limit);
		res.status(200).json({ status: "success", data: books });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const createBook = async (req, res) => {
	try {
		const book = await bookService.createBook(req.body);
		res.status(201).json({ status: "success", data: book });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const updateBook = async (req, res) => {
	try {
		const book = await bookService.updateBook(req.params.isbn, req.body);
		if (!book) {
			return res.status(404).json({ status: "error", message: "Libro no encontrado" });
		}
		res.status(200).json({ status: "success", data: book });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const deleteBook = async (req, res) => {
	try {
		const book = await bookService.deleteBook(req.params.isbn);
		if (!book) {
			return res.status(404).json({ status: "error", message: "Libro no encontrado" });
		}
		res.status(200).json({ status: "success", message: "Libro eliminado" });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const createManyBooks = async (req, res) => {
	try {
		const books = await bookService.createManyBooks(req.body);
		res.status(201).json({ status: "success", data: books });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

module.exports = {
	getBook,
	getAllBooks,
	searchBooks,
	getFeaturedBooks,
	createBook,
	updateBook,
	deleteBook,
	createManyBooks,
};
