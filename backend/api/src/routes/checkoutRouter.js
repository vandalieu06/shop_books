const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");
const { authenticateToken } = require("../middleware/auth");

/**
 * @swagger
 * /api/checkout/create-session:
 *   post:
 *     summary: Crear sesión de checkout de Stripe
 *     tags: [Checkout]
 *     description: Crea una sesión de pago de Stripe y devuelve el sessionId y url.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     book:
 *                       type: string
 *                       description: ISBN del libro o ObjectId
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Sesión creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     sessionId:
 *                       type: string
 *                     url:
 *                       type: string
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

router.post("/create-session", authenticateToken, checkoutController.createSession);

router.post(
	"/webhook",
	express.raw({ type: "application/json" }),
	checkoutController.webhook
);

module.exports = router;