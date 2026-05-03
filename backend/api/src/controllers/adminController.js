const adminService = require("../services/adminService");
const User = require("../models/userScheme");
const Order = require("../models/orderScheme");
const { buildPaginationResponse } = require("../utils/pagination");

const getMetrics = async (req, res) => {
	try {
		const metrics = await adminService.getMetrics();
		res.status(200).json({ status: "success", data: metrics });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const getAllOrders = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const status = req.query.status;
		const result = await adminService.getAllOrders(page, limit, status);
		res.status(200).json({
			status: "success",
			data: result.data,
			pagination: result.pagination,
		});
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const updateOrderStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const order = await adminService.updateOrderStatus(id, status);
		if (!order) {
			return res.status(404).json({ status: "error", message: "Pedido no encontrado" });
		}
		res.status(200).json({ status: "success", data: order });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const getAllUsersAdmin = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const result = await buildPaginationResponse(
			User,
			{},
			page,
			limit,
			null,
			{ createdAt: -1 }
		);
		const users = result.data.map((user) => {
			const userObj = user.toObject ? user.toObject() : { ...user };
			delete userObj.password;
			delete userObj.refreshToken;
			return userObj;
		});
		res.status(200).json({
			status: "success",
			data: users,
			pagination: result.pagination,
		});
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
		}
		const userObj = user.toObject ? user.toObject() : { ...user._doc };
		delete userObj.password;
		delete userObj.refreshToken;
		res.status(200).json({ status: "success", data: userObj });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { first_name, last_name, username, email, role, isActive, phone_number, address } = req.body;
		const updateData = {};
		if (first_name) updateData.first_name = first_name;
		if (last_name) updateData.last_name = last_name;
		if (username) updateData.username = username;
		if (email) updateData.email = email;
		if (role) updateData.role = role;
		if (typeof isActive === "boolean") updateData.isActive = isActive;
		if (phone_number) updateData.phone_number = phone_number;
		if (address) updateData.address = address;

		const user = await User.findByIdAndUpdate(id, updateData, { new: true });
		if (!user) {
			return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
		}
		const userObj = user.toObject ? user.toObject() : { ...user._doc };
		delete userObj.password;
		delete userObj.refreshToken;
		res.status(200).json({ status: "success", data: userObj });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
		if (!user) {
			return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
		}
		res.status(200).json({ status: "success", message: "Usuario eliminado" });
	} catch (error) {
		res.status(400).json({ status: "error", message: error.message });
	}
};

module.exports = {
	getMetrics,
	getAllOrders,
	updateOrderStatus,
	getAllUsersAdmin,
	getUserById,
	updateUser,
	deleteUser,
};