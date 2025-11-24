const User = require("../models/userScheme");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const getUser = async (id) => {
  return await User.findOne({ _id: id }, { _id: 0, __v: 0 });
};

const getAllUsers = async () => {
  return await User.find({}, { _id: 0, __v: 0 });
};

// Crear relación del carrito con el usuario
const linkCartToUser = async (userId, cartId) => {
  return await User.findByIdAndUpdate(userId, { cart: cartId }, { new: true });
};

// Funcion auxiliar
const cleanUserObject = (user) => {
  const userObject = user.toObject ? user.toObject() : user; // Acepta Mongoose Document o POJO
  delete userObject.password;
  delete userObject.__v;
  return userObject;
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

  const userObject = cleanUserObject(newUser);

  return { user: userObject, token: newToken };
};

const checkLogin = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Credenciales inválidas");
  }

  const payload = { id: user._id, email: user.email };
  const accessToken = jsonwebtoken.sign(payload, process.env.JWT_SECURE_KEY, {
    expiresIn: "15m",
  });

  const refreshToken = jsonwebtoken.sign(payload, process.env.JWT_REFRESH_KEY, {
    expiresIn: "7d",
  });

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken, user: cleanUserObject(user) };
};

const rotateRefreshToken = async (oldRefreshToken) => {
  let decoded;
  try {
    decoded = jsonwebtoken.verify(oldRefreshToken, process.env.JWT_REFRESH_KEY);
  } catch (error) {
    throw new Error("Refresh Token inválido o expirado");
  }

  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== oldRefreshToken) {
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    throw new Error("Refresh Token no válido o reutilizado.");
  }

  const payload = { id: user._id, email: user.email };

  const newAccessToken = jsonwebtoken.sign(
    payload,
    process.env.JWT_SECURE_KEY,
    { expiresIn: "15m" },
  );

  const newRefreshToken = jsonwebtoken.sign(
    payload,
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "7d" },
  );

  user.refreshToken = newRefreshToken;
  await user.save();

  return { newAccessToken, newRefreshToken, user: cleanUserObject(user) };
};

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  linkCartToUser,
  checkLogin,
  rotateRefreshToken,
};
