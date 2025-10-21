const express = require("express");
const router = express.Router();
const bookViewController = require("../controllers/bookViewController");

router.get("/", bookViewController.getAllBooks);

module.exports = router;
