const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authenticateToken } = require("../middleware/auth");

router.use(authenticateToken);

router.get("/", orderController.getAllByUser);
router.get("/:id", orderController.getById);
router.post("/", orderController.create);
router.put("/:id/status", orderController.updateStatus);
router.put("/:id/cancel", orderController.cancelOrder);

module.exports = router;
