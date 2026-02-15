const orderService = require("../services/orderService");

const getAllByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const result = await orderService.getAllByUser(userId, page, limit);
    res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const order = await orderService.getById(req.params.id, userId);
    if (!order) {
      return res.status(404).json({ status: "error", message: "Pedido no encontrado" });
    }
    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderData = { ...req.body, user: userId };
    const order = await orderService.create(orderData);
    res.status(201).json({ status: "success", data: order });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderService.updateStatus(req.params.id, status);
    if (!order) {
      return res.status(404).json({ status: "error", message: "Pedido no encontrado" });
    }
    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await orderService.cancelOrder(req.params.id, userId);
    if (!order) {
      return res.status(404).json({ status: "error", message: "Pedido no encontrado" });
    }
    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { getAllByUser, getById, create, updateStatus, cancelOrder };
