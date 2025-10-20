const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBook);
router.post("/add", bookController.createBook);
router.post("/add-many", bookController.createManyBooks);

module.exports = router;
