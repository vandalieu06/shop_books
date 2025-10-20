const userService = require("../services/userService");

const getUser = async (req, res) => {
  try {
    const response = await userService.getUser(req.params.id);
    res.status(200).json({ status: "success", data: response });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await userService.getAllUsers();
    res.status(200).json({ status: "success", data: response });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    res.status(201).json({ status: "success", data: response });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = {
  getUser,
  getAllUsers,
  createUser,
};
