const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);
router.get("/search", bookController.searchBooks);
router.get("/featured", bookController.getFeaturedBooks);
router.get("/:isbn", bookController.getBook);
router.post("/add", bookController.createBook);
router.put("/:isbn", bookController.updateBook);
router.delete("/:isbn", bookController.deleteBook);
router.post("/add-many", bookController.createManyBooks);

module.exports = router;
