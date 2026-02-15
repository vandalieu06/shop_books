const publisherService = require("../services/publisherService");

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const result = await publisherService.getAll(page, limit);
    res.status(200).json({ status: "success", data: result.data, pagination: result.pagination });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const publisher = await publisherService.getById(req.params.id);
    if (!publisher) {
      return res.status(404).json({ status: "error", message: "Editorial no encontrada" });
    }
    res.status(200).json({ status: "success", data: publisher });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const publisher = await publisherService.create(req.body);
    res.status(201).json({ status: "success", data: publisher });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const publisher = await publisherService.update(req.params.id, req.body);
    if (!publisher) {
      return res.status(404).json({ status: "error", message: "Editorial no encontrada" });
    }
    res.status(200).json({ status: "success", data: publisher });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const publisher = await publisherService.remove(req.params.id);
    if (!publisher) {
      return res.status(404).json({ status: "error", message: "Editorial no encontrada" });
    }
    res.status(200).json({ status: "success", message: "Editorial eliminada" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
