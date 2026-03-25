const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Obtener todos los autores
 *     tags: [Authors]
 *     description: Lista todos los autores registrados.
 *     responses:
 *       200:
 *         description: Lista de autores
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
 *                     $ref: "#/components/schemas/Author"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Obtener un autor por ID
 *     tags: [Authors]
 *     description: Retorna los datos de un autor específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del autor
 *     responses:
 *       200:
 *         description: Datos del autor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Author"
 *       404:
 *         description: Autor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Crear un nuevo autor
 *     tags: [Authors]
 *     description: Crea un nuevo autor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del autor
 *                 example: "Gabriel García Márquez"
 *               biography:
 *                 type: string
 *                 example: "Escritor colombiano..."
 *               nationality:
 *                 type: string
 *                 example: "Colombiano"
 *     responses:
 *       201:
 *         description: Autor creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Author"
 *       400:
 *         description: Error al crear autor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Actualizar un autor
 *     tags: [Authors]
 *     description: Actualiza un autor por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del autor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Author"
 *     responses:
 *       200:
 *         description: Autor actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Author"
 *       404:
 *         description: Autor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Eliminar un autor
 *     tags: [Authors]
 *     description: Elimina (soft delete) un autor por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del autor
 *     responses:
 *       200:
 *         description: Autor eliminado
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
 *                   example: "Autor eliminado"
 *       404:
 *         description: Autor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

router.get("/", authorController.getAll);
router.get("/:id", authorController.getById);
router.post("/", authorController.create);
router.put("/:id", authorController.update);
router.delete("/:id", authorController.remove);

module.exports = router;
