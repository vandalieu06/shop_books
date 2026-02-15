const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/auth");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/refresh", userController.refresh);
router.post("/logout", authenticateToken, userController.logout);
router.get("/me", authenticateToken, userController.me);

module.exports = router;
