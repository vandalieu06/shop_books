const { User } = require("../models/userScheme");

const getUser = async (id) => {
  return await User.findOne({ _id: id }, { _id: 0, __v: 0 });
};

const getAllUsers = async () => {
  return await User.find({}, { _id: 0, __v: 0 });
};

const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

module.exports = {
  getUser,
  getAllUsers,
  createUser,
};
