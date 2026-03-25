const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authenticateToken } = require("../middleware/auth");

router.use(authenticateToken);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener pedidos del usuario
 *     tags: [Orders]
 *     description: Lista los pedidos del usuario autenticado con paginación.
 *     parameters:
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
 *         description: Lista de pedidos
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
 *                     $ref: "#/components/schemas/Order"
 *                 pagination:
 *                   $ref: "#/components/schemas/Pagination"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     tags: [Orders]
 *     description: Retorna los detalles de un pedido específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Order"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Orders]
 *     description: Crea un nuevo pedido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - total_price
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     book:
 *                       type: string
 *                     title:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *               total_price:
 *                 type: number
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   street: { type: string }
 *                   city: { type: string }
 *                   zipcode: { type: string }
 *                   country: { type: string }
 *     responses:
 *       201:
 *         description: Pedido creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Order"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Actualizar estado del pedido
 *     tags: [Orders]
 *     description: Actualiza el estado de un pedido.
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
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Paid, Shipped, Delivered, Cancelled]
 *     responses:
 *       200:
 *         description: Pedido actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Order"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   put:
 *     summary: Cancelar un pedido
 *     tags: [Orders]
 *     description: Cancela un pedido del usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido cancelado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: "#/components/schemas/Order"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

router.get("/", orderController.getAllByUser);
router.get("/:id", orderController.getById);
router.post("/", orderController.create);
router.put("/:id/status", orderController.updateStatus);
router.put("/:id/cancel", orderController.cancelOrder);

module.exports = router;
