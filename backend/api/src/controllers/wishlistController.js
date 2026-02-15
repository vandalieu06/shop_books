const wishlistService = require("../services/wishlistService");

const getByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await wishlistService.getByUser(userId);
    res.status(200).json({ status: "success", data: wishlist });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const add = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;
    if (!bookId) {
      return res.status(400).json({ status: "error", message: "bookId es requerido" });
    }
    const item = await wishlistService.add(userId, bookId);
    res.status(201).json({ status: "success", data: item });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;
    const item = await wishlistService.remove(userId, bookId);
    if (!item) {
      return res.status(404).json({ status: "error", message: "Libro no encontrado en wishlist" });
    }
    res.status(200).json({ status: "success", message: "Libro eliminado de wishlist" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const check = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.query;
    if (!bookId) {
      return res.status(400).json({ status: "error", message: "bookId es requerido" });
    }
    const exists = await wishlistService.check(userId, bookId);
    res.status(200).json({ status: "success", data: { exists } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { getByUser, add, remove, check };
