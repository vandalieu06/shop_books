const express = require("express");
const router = express.Router();
const publisherController = require("../controllers/publisherController");

/**
 * @swagger
 * /api/publishers:
 *   get:
 *     summary: Obtener todas las editoriales
 *     tags: [Publishers]
 *     description: Lista todas las editoriales registradas.
 *     responses:
 *       200:
 *         description: Lista de editoriales
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
 *                     $ref: "#/components/schemas/Publisher"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/publishers/{id}:
 *   get:
 *     summary: Obtener una editorial por ID
 *     tags: [Publishers]
 *     description: Retorna los datos de una editorial específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la editorial
 *     responses:
 *       200:
 *         description: Datos de la editorial
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Publisher"
 *       404:
 *         description: Editorial no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/publishers:
 *   post:
 *     summary: Crear una nueva editorial
 *     tags: [Publishers]
 *     description: Crea una nueva editorial.
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
 *                 description: Nombre de la editorial
 *                 example: "Penguin Random House"
 *               country:
 *                 type: string
 *                 example: "España"
 *               website:
 *                 type: string
 *                 example: "https://www.penguinrandomhouse.com"
 *     responses:
 *       201:
 *         description: Editorial creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Publisher"
 *       400:
 *         description: Error al crear editorial
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/publishers/{id}:
 *   put:
 *     summary: Actualizar una editorial
 *     tags: [Publishers]
 *     description: Actualiza una editorial por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la editorial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Publisher"
 *     responses:
 *       200:
 *         description: Editorial actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Publisher"
 *       404:
 *         description: Editorial no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/publishers/{id}:
 *   delete:
 *     summary: Eliminar una editorial
 *     tags: [Publishers]
 *     description: Elimina (soft delete) una editorial por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la editorial
 *     responses:
 *       200:
 *         description: Editorial eliminada
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
 *                   example: "Editorial eliminada"
 *       404:
 *         description: Editorial no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

router.get("/", publisherController.getAll);
router.get("/:id", publisherController.getById);
router.post("/", publisherController.create);
router.put("/:id", publisherController.update);
router.delete("/:id", publisherController.remove);

module.exports = router;
