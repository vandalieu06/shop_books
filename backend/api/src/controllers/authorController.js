const authorService = require("../services/authorService");

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const result = await authorService.getAll(page, limit, search);
    res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const author = await authorService.getById(req.params.id);
    if (!author) {
      return res.status(404).json({ status: "error", message: "Autor no encontrado" });
    }
    res.status(200).json({ status: "success", data: author });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const author = await authorService.create(req.body);
    res.status(201).json({ status: "success", data: author });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const author = await authorService.update(req.params.id, req.body);
    if (!author) {
      return res.status(404).json({ status: "error", message: "Autor no encontrado" });
    }
    res.status(200).json({ status: "success", data: author });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const author = await authorService.remove(req.params.id);
    if (!author) {
      return res.status(404).json({ status: "error", message: "Autor no encontrado" });
    }
    res.status(200).json({ status: "success", message: "Autor eliminado" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
