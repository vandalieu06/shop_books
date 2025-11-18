const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/add", userController.createUser);
router.post("/login", userController.login);

module.exports = router;
