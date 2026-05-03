const Order = require("../models/orderScheme");
const User = require("../models/userScheme");
const { buildPaginationResponse } = require("../utils/pagination");

const getMetrics = async () => {
	const [usersCount, ordersCount] = await Promise.all([
		User.countDocuments({ isActive: { $ne: false } }),
		Order.countDocuments(),
	]);

	const revenueResult = await Order.aggregate([
		{ $match: { status: { $in: ["Paid", "Shipped", "Delivered"] } } },
		{ $group: { _id: null, total: { $sum: "$total_price" } } },
	]);

	const revenue = revenueResult[0]?.total || 0;

	const ordersByStatus = await Order.aggregate([
		{ $group: { _id: "$status", count: { $sum: 1 } } },
	]);

	const statusCounts = {};
	ordersByStatus.forEach((item) => {
		statusCounts[item._id] = item.count;
	});

	const monthlyOrdersResult = await Order.aggregate([
		{
			$group: {
				_id: {
					year: { $year: "$createdAt" },
					month: { $month: "$createdAt" },
				},
				count: { $sum: 1 },
			},
		},
		{ $sort: { "_id.year": 1, "_id.month": 1 } },
	]);

	const monthlyOrders = monthlyOrdersResult.map((item) => ({
		month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
		count: item.count,
	}));

	return {
		usersCount,
		ordersCount,
		revenue,
		ordersByStatus: statusCounts,
		monthlyOrders,
	};
};

const getAllOrders = async (page = 1, limit = 20, status = null) => {
	const query = status ? { status } : {};
	const populateOptions = [
		{ path: "items.book", select: "name image price isbn" },
		{ path: "user", select: "first_name last_name email username" },
	];

	return await buildPaginationResponse(
		Order,
		query,
		page,
		limit,
		populateOptions,
		{ createdAt: -1 }
	);
};

const updateOrderStatus = async (id, status) => {
	const validStatuses = ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"];
	if (!validStatuses.includes(status)) {
		throw new Error("Estado no válido");
	}
	return await Order.findByIdAndUpdate(id, { status }, { new: true })
		.populate("items.book", "name image price isbn")
		.populate("user", "first_name last_name email username")
		.lean();
};

module.exports = { getMetrics, getAllOrders, updateOrderStatus };