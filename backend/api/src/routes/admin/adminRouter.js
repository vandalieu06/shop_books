const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
const { authenticateToken } = require("../../middleware/auth");
const roleMiddleware = require("../../middleware/roleMiddleware");

router.use(authenticateToken);
router.use(roleMiddleware("admin"));

router.get("/metrics", adminController.getMetrics);
router.get("/orders", adminController.getAllOrders);
router.put("/orders/:id/status", adminController.updateOrderStatus);
router.get("/users", adminController.getAllUsersAdmin);
router.get("/users/:id", adminController.getUserById);
router.put("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);

module.exports = router;