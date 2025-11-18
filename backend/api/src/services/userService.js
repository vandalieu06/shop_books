const User = require("../models/userScheme");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const getUser = async (id) => {
  return await User.findOne({ _id: id }, { _id: 0, __v: 0 });
};

const getAllUsers = async () => {
  return await User.find({}, { _id: 0, __v: 0 });
};

// Crear Usuario + Generar JWT
const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.save();

  // El JWT contendrá el _id y email para tener acceso en futuras consultas
  const payload = { id: newUser._id, email: newUser.email };
  const newToken = jsonwebtoken.sign(payload, process.env.JWT_SECURE_KEY, {
    expiresIn: "1h",
  });

  const userObject = newUser.toObject();
  delete userObject.password;
  delete userObject.__v;

  return { user: userObject, token: newToken };
};

// Comprovamo las credeciales del login
const checkLogin = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Credenciales inválidas"); 
  }

  const token = jsonwebtoken.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECURE_KEY,
    { expiresIn: "1h" },
  );

  const userObject = user.toObject();
  delete userObject.password; 
  delete userObject.__v;

  return { token, user: userObject };
};

// Crear realcion del carrito con el usuario
const linkCartToUser = async (userId, cartId) => {
  return await User.findByIdAndUpdate(userId, { cart: cartId }, { new: true });
};

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  checkLogin,
  linkCartToUser,
};
