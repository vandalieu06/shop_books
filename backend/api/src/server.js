require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db.js");

// API Routes File
const userRoutes = require("./routes/userRoute.js");
const bookRoutes = require("./routes/bookRouter.js");

// Temporal View Routes Files + package
const exphbs = require("express-handlebars");
const bookViewRoutes = require("./routes/pages/bookViewRouter.js");
const userViewRoutes = require("./routes/pages/userViewRoute.js");

// Variables globales
const PORT = process.env.PORT || 3000;
const app = express();

// Config Handlebars
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
  }),
);
app.set("view engine", "hbs");

// Basic Config
app.use(express.json());
connectDB();

// API Routes
app.get("/", (_, res) => res.send("API Ecommerce en marxa"));
app.use("/api/usuarios", userRoutes);
app.use("/api/books", bookRoutes);

// Temporal View Routes
app.use("/books", bookViewRoutes);
app.use("/users", userViewRoutes);

app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));
