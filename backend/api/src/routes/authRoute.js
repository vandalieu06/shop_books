const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicio de sesión de usuario
 *     tags: [Auth]
 *     description: Autentica a un usuario con email y contraseña. Devuelve tokens de acceso y refresh.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *                 example: "Password123"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthResponse"
 *       401:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de nuevo usuario
 *     tags: [Auth]
 *     description: Crea una nueva cuenta de usuario. Devuelve tokens de acceso y refresh.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - username
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "Juan"
 *               last_name:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: "Pérez"
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único
 *                 example: "juanperez"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico único
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *                 example: "Password123"
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento (opcional)
 *                 example: "1995-06-15"
 *               phone_number:
 *                 type: string
 *                 description: Número de teléfono (opcional)
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: Registro exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthResponse"
 *       400:
 *         description: Error en el registro (email/username ya existe o datos inválidos)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Renovación de tokens
 *     tags: [Auth]
 *     description: Renueva el token de acceso usando un refresh token válido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Token de refresh válido
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Tokens renovados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthResponse"
 *       400:
 *         description: Refresh token no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       403:
 *         description: Refresh token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cierre de sesión
 *     tags: [Auth]
 *     description: Cierra la sesión del usuario invalidateando el refresh token.
 *     responses:
 *       200:
 *         description: Logout exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Logout exitoso"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtener usuario actual
 *     tags: [Auth]
 *     description: Devuelve los datos del usuario autenticado actualmente.
 *     responses:
 *       200:
 *         description: Datos del usuario actual
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/User"
 *       401:
 *         description: No autorizado (token inválido o ausente)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh", authController.refresh);
router.post("/logout", authenticateToken, authController.logout);
router.get("/me", authenticateToken, authController.me);

module.exports = router;
