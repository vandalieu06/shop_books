const User = require("../models/userScheme");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
	return await User.find(); // El esquema ya oculta el password por defecto
};

const getUserById = async (id) => {
	return await User.findById(id);
};

const createUser = async (userData) => {
	const user = new User(userData);
	await user.save();

	const token = jsonwebtoken.sign(
		{ id: user._id, role: user.role },
		process.env.JWT_SECURE_KEY,
		{ expiresIn: "1h" },
	);

	return { user, token };
};

const login = async (email, password) => {
	// Forzamos la selección del password ya que tiene 'select: false'
	const user = await User.findOne({ email }).select("+password");

	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new Error("Credenciales incorrectas");
	}

	const accessToken = jsonwebtoken.sign(
		{ id: user._id, email: user.email },
		process.env.JWT_SECURE_KEY,
		{ expiresIn: "15m" },
	);

	const refreshToken = jsonwebtoken.sign(
		{ id: user._id },
		process.env.JWT_REFRESH_KEY,
		{ expiresIn: "7d" },
	);

	user.refreshToken = refreshToken;
	await user.save();

	return { user, accessToken, refreshToken };
};

const register = async (userData) => {
	const existingUser = await User.findOne({ email: userData.email });
	if (existingUser) {
		throw new Error("El email ya está registrado");
	}
	
	const user = new User(userData);
	await user.save();

	const accessToken = jsonwebtoken.sign(
		{ id: user._id, email: user.email },
		process.env.JWT_SECURE_KEY,
		{ expiresIn: "15m" },
	);

	const refreshToken = jsonwebtoken.sign(
		{ id: user._id },
		process.env.JWT_REFRESH_KEY,
		{ expiresIn: "7d" },
	);

	user.refreshToken = refreshToken;
	await user.save();

	const userWithoutPassword = user.toObject();
	delete userWithoutPassword.password;
	delete userWithoutPassword.refreshToken;

	return { user: userWithoutPassword, accessToken, refreshToken };
};

const logout = async (userId) => {
	await User.findByIdAndUpdate(userId, { refreshToken: null });
	return { message: "Logout exitoso" };
};

const getCurrentUser = async (userId) => {
	const user = await User.findById(userId);
	if (!user) {
		throw new Error("Usuario no encontrado");
	}
	const userObj = user.toObject();
	delete userObj.password;
	delete userObj.refreshToken;
	return userObj;
};

const rotateRefreshToken = async (oldRefreshToken) => {
	try {
		const decoded = jsonwebtoken.verify(oldRefreshToken, process.env.JWT_REFRESH_KEY);
		const user = await User.findById(decoded.id).select("+refreshToken");
		
		if (!user || user.refreshToken !== oldRefreshToken) {
			throw new Error("Token inválido");
		}

		const newAccessToken = jsonwebtoken.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECURE_KEY,
			{ expiresIn: "15m" },
		);

		const newRefreshToken = jsonwebtoken.sign(
			{ id: user._id },
			process.env.JWT_REFRESH_KEY,
			{ expiresIn: "7d" },
		);

		user.refreshToken = newRefreshToken;
		await user.save();

		const userObj = user.toObject();
		delete userObj.password;
		delete userObj.refreshToken;

		return { newAccessToken, newRefreshToken, user: userObj };
	} catch (error) {
		throw new Error("Token inválido o expirado");
	}
};

module.exports = { 
	getAllUsers, 
	getUserById, 
	createUser, 
	login, 
	register, 
	logout, 
	getCurrentUser,
	rotateRefreshToken 
};
