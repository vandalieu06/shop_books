const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     description: Lista todos los usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/User"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     description: Retorna los datos de un usuario específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
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
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/usuarios/add:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     description: Crea un nuevo usuario (registro manual).
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
 *                 example: "Juan"
 *               last_name:
 *                 type: string
 *                 example: "Pérez"
 *               username:
 *                 type: string
 *                 example: "juanperez"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Password123"
 *     responses:
 *       201:
 *         description: Usuario creado
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
 *       400:
 *         description: Error al crear usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/add", userController.createUser);

module.exports = router;
