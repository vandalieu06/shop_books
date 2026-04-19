const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Book = require("../models/bookScheme");
const Order = require("../models/orderScheme");
const { generateOrderCode } = require("./orderService");

const createCheckoutSession = async (items, userId) => {
	const lineItems = await Promise.all(
		items.map(async (item) => {
			let book;
			if (!item.book.match(/^[0-9a-fA-F]{24}$/)) {
				book = await Book.findOne({ isbn: item.book, isActive: true });
			} else {
				book = await Book.findById(item.book);
			}

			if (!book) {
				throw new Error(`Producto no encontrado: ${item.book}`);
			}

			if (book.type_book === "fisico" && book.unit_stock < item.quantity) {
				throw new Error(`Stock insuficiente para "${book.name}". Stock disponible: ${book.unit_stock}`);
			}

			if (!book.price || book.price <= 0) {
				throw new Error(`Precio inválido para "${book.name}"`);
			}

			return {
				price_data: {
					currency: "eur",
					product_data: {
						name: book.name,
						description: book.description?.substring(0, 500),
					},
					unit_amount: Math.round(book.price * 100),
				},
				quantity: item.quantity,
			};
		})
	);

	const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: lineItems,
		mode: "payment",
		success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${baseUrl}/checkout/cancel`,
		customer_email: undefined,
		metadata: {
			userId: userId.toString(),
			items: JSON.stringify(
				items.map((item) => ({
					book: item.book,
					quantity: item.quantity,
				}))
			),
		},
	});

	return { sessionId: session.id, url: session.url };
};

const retrieveSession = async (sessionId) => {
	const session = await stripe.checkout.sessions.retrieve(sessionId, {
		expand: ["line_items", "payment_intent"],
	});
	return session;
};

const createOrderFromSession = async (session) => {
	const { metadata, amount_total } = session;

	let items = [];
	try {
		items = JSON.parse(metadata.items || "[]");
	} catch {
		items = [];
	}

	const userId = metadata.userId;
	if (!userId) {
		throw new Error("No userId in session metadata");
	}

	const orderItems = await Promise.all(
		items.map(async (item) => {
			let book;
			if (!item.book.match(/^[0-9a-fA-F]{24}$/)) {
				book = await Book.findOne({ isbn: item.book });
			} else {
				book = await Book.findById(item.book);
			}

			return {
				book: book?._id,
				title: book?.name || "Unknown",
				quantity: item.quantity,
				price: book?.price || 0,
			};
		})
	);

	const order = new Order({
		order_code: generateOrderCode(),
		user: userId,
		items: orderItems,
		total_price: (amount_total || 0) / 100,
		status: "Paid",
		shippingAddress: {},
		paymentIntentId: session.payment_intent,
	});

	return await order.save();
};

module.exports = { createCheckoutSession, retrieveSession, createOrderFromSession };