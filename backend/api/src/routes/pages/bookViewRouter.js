const express = require("express");
const router = express.Router();
const bookViewController = require("../../controllers/pages/bookViewController");

router.get("/", bookViewController.getAllBooks);

module.exports = router;
