const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const response = await userService.getAllUsers();
    res.render("userList", {
      title: "Lista de usuarios",
      users: response,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = {
  getAllUsers,
};
