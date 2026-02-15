const reviewService = require("../services/reviewService");

const getByBook = async (req, res) => {
  try {
    const { bookId } = req.query;
    if (!bookId) {
      return res.status(400).json({ status: "error", message: "bookId es requerido" });
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const result = await reviewService.getByBook(bookId, page, limit);
    res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviews = await reviewService.getByUser(userId);
    res.status(200).json({ status: "success", data: reviews });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviewData = { ...req.body, user: userId };
    const review = await reviewService.create(reviewData);
    res.status(201).json({ status: "success", data: review });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const userId = req.user.id;
    const review = await reviewService.update(req.params.id, userId, req.body);
    if (!review) {
      return res.status(404).json({ status: "error", message: "Reseña no encontrada" });
    }
    res.status(200).json({ status: "success", data: review });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const userId = req.user.id;
    const review = await reviewService.remove(req.params.id, userId);
    if (!review) {
      return res.status(404).json({ status: "error", message: "Reseña no encontrada" });
    }
    res.status(200).json({ status: "success", message: "Reseña eliminada" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { getByBook, getByUser, create, update, remove };
