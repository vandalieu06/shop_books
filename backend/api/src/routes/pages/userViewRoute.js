const express = require("express");
const router = express.Router();
const userViewController = require("../../controllers/pages/userViewController");

router.get("/", userViewController.getAllUsers);

module.exports = router;
