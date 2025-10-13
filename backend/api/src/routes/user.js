const express = require("express");
const User = require("../models/userScheme");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Ruta /api");
});

router.get("/users", async (req, res) => {
  try {
    const db = await User.find({}, {"_id": 0, "__v": 0});
    return res.json(db);
  } catch (error) {
    console.log({"error": error.message});
  }
});

router.post("/users", (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.save();
    return res.status(201).json({ mensaje: "Usuario creado", usuario: newUser });
  } catch (error) {
    console.log({"error": error.message});
  }

});

module.exports = router;