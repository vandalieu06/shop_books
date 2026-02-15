const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticateToken } = require("../middleware/auth");

router.get("/book", reviewController.getByBook);
router.use(authenticateToken);

router.get("/my-reviews", reviewController.getByUser);
router.post("/", reviewController.create);
router.put("/:id", reviewController.update);
router.delete("/:id", reviewController.remove);

module.exports = router;
