const jsonwebtoken = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ status: "error", message: "Token no proporcionado" });
	}

	try {
		const decoded = jsonwebtoken.verify(token, process.env.JWT_SECURE_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(403).json({ status: "error", message: "Token inválido o expirado" });
	}
};

module.exports = { authenticateToken };
