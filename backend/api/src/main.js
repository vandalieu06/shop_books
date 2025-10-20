require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoute");
const bookRoutes = require("./routes/bookRouter.js");

const app = express();

//Variables globales
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

// Rutas de la API
app.get("/", (req, res) => res.send("API Ecommerce en marxa"));
app.use("/api/usuarios", userRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));
