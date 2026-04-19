const Order = require("../models/orderScheme");
const Book = require("../models/bookScheme");
const { buildPaginationResponse } = require("../utils/pagination");

const generateOrderCode = () => {
	const timestamp = Date.now().toString(36).toUpperCase();
	const random = Math.random().toString(36).substring(2, 6).toUpperCase();
	return `ORD-${timestamp}-${random}`;
};

const validateStock = async (items) => {
	const errors = [];
	for (const item of items) {
		let bookId = item.book;
		if (item.book && !item.book.match(/^[0-9a-fA-F]{24}$/)) {
			const book = await Book.findOne({ isbn: item.book });
			if (book) {
				bookId = book._id;
			} else {
				errors.push({ book: item.book, message: "Book not found" });
				continue;
			}
		}
		const book = await Book.findById(bookId);
		if (!book) {
			errors.push({ book: item.book, message: "Book not found" });
		} else if (book.unit_stock < item.quantity) {
			errors.push({
				book: item.book,
				message: `Insufficient stock. Available: ${book.unit_stock}`,
			});
		}
	}
	if (errors.length > 0) {
		throw new Error(JSON.stringify(errors));
	}
	return true;
};

const getAllByUser = async (userId, page = 1, limit = 20) => {
	const query = { user: userId };
	return await buildPaginationResponse(
		Order,
		query,
		page,
		limit,
		{
			path: "items.book",
			select: "name image price",
		},
		{ createdAt: -1 }
	);
};

const getById = async (id, userId = null) => {
	const query = { _id: id };
	if (userId) {
		query.user = userId;
	}
	return await Order.findOne(query)
		.populate("items.book", "name image price")
		.populate("user", "first_name last_name email")
		.lean();
};

const create = async (data) => {
	if (data.items && Array.isArray(data.items)) {
		await validateStock(data.items);
		for (const item of data.items) {
			if (item.book && !item.book.match(/^[0-9a-fA-F]{24}$/)) {
				const book = await Book.findOne({ isbn: item.book });
				if (book) {
					item.book = book._id;
					item.price = book.price;
					item.title = book.name;
				}
			} else {
				const book = await Book.findById(item.book);
				if (book) {
					item.price = book.price;
					item.title = book.name;
				}
			}
		}
	}

	if (!data.order_code) {
		data.order_code = generateOrderCode();
	}

	const order = new Order(data);
	return await order.save();
};

const updateStatus = async (id, status) => {
	const validStatuses = [
		"Pending",
		"Paid",
		"Shipped",
		"Delivered",
		"Cancelled",
	];
	if (!validStatuses.includes(status)) {
		throw new Error("Estado no válido");
	}
	return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

const cancelOrder = async (id, userId) => {
	const order = await Order.findOne({ _id: id, user: userId });
	if (!order) {
		throw new Error("Pedido no encontrado");
	}
	if (order.status !== "Pending") {
		throw new Error("No se puede cancelar un pedido que ya ha sido procesado");
	}
	return await Order.findByIdAndUpdate(
		id,
		{ status: "Cancelled" },
		{ new: true },
	);
};

module.exports = { getAllByUser, getById, create, updateStatus, cancelOrder, validateStock, generateOrderCode };
