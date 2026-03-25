const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     description: Lista todas las categorías registradas.
 *     responses:
 *       200:
 *         description: Lista de categorías
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
 *                     $ref: "#/components/schemas/Category"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categories]
 *     description: Retorna los datos de una categoría específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Datos de la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Category"
 *       404:
 *         description: Categoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     description: Crea una nueva categoría.
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
 *                 description: Nombre de la categoría
 *                 example: "Ciencia Ficción"
 *               description:
 *                 type: string
 *                 example: "Libros de ciencia ficción y fantasía"
 *     responses:
 *       201:
 *         description: Categoría creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Category"
 *       400:
 *         description: Error al crear categoría
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags: [Categories]
 *     description: Actualiza una categoría por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Category"
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Category"
 *       404:
 *         description: Categoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categories]
 *     description: Elimina (soft delete) una categoría por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada
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
 *                   example: "Categoría eliminada"
 *       404:
 *         description: Categoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/", categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.remove);

module.exports = router;
