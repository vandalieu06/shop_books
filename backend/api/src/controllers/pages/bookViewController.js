const bookService = require("../../services/bookService");

const getAllBooks = async (req, res) => {
	try {
		const books = await bookService.getAllBooks();
		res.render("bookList", {
			title: "Lista de libros",
			books: books,
		});
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

module.exports = {
	getAllBooks,
};
