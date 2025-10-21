require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoute.js");
const bookRoutes = require("./routes/bookRouter.js");
const bookViewRoutes = require("./routes/bookViewRouter.js");
const userViewRoutes = require("./routes/userViewRoute.js");

//Variables globales
const PORT = process.env.PORT || 3000;
const app = express();

//Config Handlebars
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "hbs");

// Basic Config
app.use(express.json());
connectDB();

// Rutas de la API
app.get("/", (req, res) => res.send("API Ecommerce en marxa"));
app.use("/api/usuarios", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/books", bookViewRoutes);
app.use("/users", userViewRoutes);

app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));
