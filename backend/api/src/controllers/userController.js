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
		const { accessToken, refreshToken, user } = await userService.checkLogin(
			req.body,
		);

		res.status(200).json({
			status: "success",
			data: {
				accessToken,
				refreshToken,
				user,
			},
		});
	} catch (error) {
		res.status(401).json({ status: "error", message: error.message });
	}
};

// Refresh Token Service
const refresh = async (req, res) => {
	const { refreshToken: oldRefreshToken } = req.body;

	if (!oldRefreshToken) {
		return res
			.status(400)
			.json({ status: "error", message: "Refresh Token no proporcionado" });
	}

	try {
		const data = await userService.rotateRefreshToken(oldRefreshToken);
		const { newAccessToken, newRefreshToken, user } = data;

		res.status(200).json({
			status: "success",
			data: {
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
				user,
			},
		});
	} catch (error) {
		res.status(403).json({
			status: "error",
			message: error.message || "Acceso denegado. Vuelve a iniciar sesión.",
		});
	}
};

module.exports = {
	getUser,
	getAllUsers,
	createUser,
	login,
	refresh,
};
