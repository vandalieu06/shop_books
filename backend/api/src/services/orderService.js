const Order = require("../models/orderScheme");
const { buildPaginationResponse } = require("../utils/pagination");

const getAllByUser = async (userId, page = 1, limit = 20) => {
  const query = { user: userId };
  return await buildPaginationResponse(Order, query, page, limit, { path: 'items.book', select: 'name image price' });
};

const getById = async (id, userId = null) => {
  const query = { _id: id };
  if (userId) {
    query.user = userId;
  }
  return await Order.findOne(query)
    .populate('items.book', 'name image price')
    .populate('user', 'first_name last_name email')
    .lean();
};

const create = async (data) => {
  const order = new Order(data);
  return await order.save();
};

const updateStatus = async (id, status) => {
  const validStatuses = ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"];
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
  return await Order.findByIdAndUpdate(id, { status: "Cancelled" }, { new: true });
};

module.exports = { getAllByUser, getById, create, updateStatus, cancelOrder };
