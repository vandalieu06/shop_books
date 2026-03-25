const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { authenticateToken } = require("../middleware/auth");

router.use(authenticateToken);

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Obtener wishlist del usuario
 *     tags: [Wishlist]
 *     description: Lista los libros en la wishlist del usuario autenticado.
 *     responses:
 *       200:
 *         description: Lista de libros en wishlist
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
 *                     $ref: "#/components/schemas/WishlistItem"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Añadir libro a wishlist
 *     tags: [Wishlist]
 *     description: Añade un libro a la wishlist del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: ID del libro
 *     responses:
 *       201:
 *         description: Libro añadido a wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/WishlistItem"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/wishlist/check:
 *   get:
 *     summary: Verificar si un libro está en wishlist
 *     tags: [Wishlist]
 *     description: Verifica si un libro específico está en la wishlist del usuario.
 *     parameters:
 *       - in: query
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Resultado de la verificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     exists:
 *                       type: boolean
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/wishlist/{bookId}:
 *   delete:
 *     summary: Eliminar libro de wishlist
 *     tags: [Wishlist]
 *     description: Elimina un libro de la wishlist del usuario.
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Libro eliminado de wishlist
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
 *                   example: "Libro eliminado de wishlist"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

router.get("/", wishlistController.getByUser);
router.post("/", wishlistController.add);
router.get("/check", wishlistController.check);
router.delete("/:bookId", wishlistController.remove);

module.exports = router;
