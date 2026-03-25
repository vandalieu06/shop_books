const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticateToken } = require("../middleware/auth");

/**
 * @swagger
 * /api/reviews/book:
 *   get:
 *     summary: Obtener reseñas de un libro
 *     tags: [Reviews]
 *     description: Lista las reseñas de un libro específico. No requiere autenticación.
 *     parameters:
 *       - in: query
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del libro
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Lista de reseñas
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
 *                     $ref: "#/components/schemas/Review"
 *                 pagination:
 *                   $ref: "#/components/schemas/Pagination"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

router.use(authenticateToken);

/**
 * @swagger
 * /api/reviews/my-reviews:
 *   get:
 *     summary: Obtener mis reseñas
 *     tags: [Reviews]
 *     description: Lista las reseñas del usuario autenticado.
 *     responses:
 *       200:
 *         description: Lista de reseñas del usuario
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
 *                     $ref: "#/components/schemas/Review"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Crear una reseña
 *     tags: [Reviews]
 *     description: Crea una nueva reseña para un libro.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - book
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Excelente libro, muy recomendado"
 *               book:
 *                 type: string
 *                 description: ID del libro
 *     responses:
 *       201:
 *         description: Reseña creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Review"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Actualizar una reseña
 *     tags: [Reviews]
 *     description: Actualiza una reseña del usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reseña actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Review"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Eliminar una reseña
 *     tags: [Reviews]
 *     description: Elimina una reseña del usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reseña eliminada
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
 *                   example: "Reseña eliminada"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

router.get("/book", reviewController.getByBook);
router.get("/my-reviews", reviewController.getByUser);
router.post("/", reviewController.create);
router.put("/:id", reviewController.update);
router.delete("/:id", reviewController.remove);

module.exports = router;
