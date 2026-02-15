const categoryService = require("../services/categoryService");

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const result = await categoryService.getAll(page, limit);
    res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const category = await categoryService.getById(req.params.id);
    if (!category) {
      return res.status(404).json({ status: "error", message: "Categoría no encontrada" });
    }
    res.status(200).json({ status: "success", data: category });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const category = await categoryService.create(req.body);
    res.status(201).json({ status: "success", data: category });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const category = await categoryService.update(req.params.id, req.body);
    if (!category) {
      return res.status(404).json({ status: "error", message: "Categoría no encontrada" });
    }
    res.status(200).json({ status: "success", data: category });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const category = await categoryService.remove(req.params.id);
    if (!category) {
      return res.status(404).json({ status: "error", message: "Categoría no encontrada" });
    }
    res.status(200).json({ status: "success", message: "Categoría eliminada" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
