require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const apiRouter = require("./routes/user");
const User = require("./models/userScheme");

const app = express();

//Variables globales
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

// Rutas de la API
app.get("/", (req, res) => res.send("API Ecommerce en marxa"));
app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));
