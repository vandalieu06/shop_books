const userService = require("../services/userService");

// Obtener un usuario por ID
const getUser = async (req, res) => {
  try {
    const response = await userService.getUser(req.params.id);

    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    res.status(200).json({ status: "success", data: response });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Obtener todos los usuarios
const getAllUsers = async (_, res) => {
  try {
    const response = await userService.getAllUsers();
    res.status(200).json({ status: "success", data: response });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    res.status(201).json({ status: "success", data: response });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

// Autenticación (Login)
const login = async (req, res) => {
  try {
    const token = await userService.checkLogin(req.body);
    res.status(200).json({ status: "success", token: token });
  } catch (error) {
    res.status(401).json({ status: "error", message: error.message });
  }
};

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  login,
};
