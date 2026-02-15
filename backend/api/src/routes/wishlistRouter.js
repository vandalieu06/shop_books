const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { authenticateToken } = require("../middleware/auth");

router.use(authenticateToken);

router.get("/", wishlistController.getByUser);
router.post("/", wishlistController.add);
router.get("/check", wishlistController.check);
router.delete("/:bookId", wishlistController.remove);

module.exports = router;
