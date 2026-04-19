require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");
const Book = require("./models/bookScheme.js");

// API Routes File
const userRoutes = require("./routes/userRoute.js");
const bookRoutes = require("./routes/bookRouter.js");
const authRoutes = require("./routes/authRoute.js");
const authorRoutes = require("./routes/authorRouter.js");
const categoryRoutes = require("./routes/categoryRouter.js");
const publisherRoutes = require("./routes/publisherRouter.js");
const orderRoutes = require("./routes/orderRouter.js");
const reviewRoutes = require("./routes/reviewRouter.js");
const wishlistRoutes = require("./routes/wishlistRouter.js");
const checkoutRoutes = require("./routes/checkoutRouter.js");

//Swagger Api Docs
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

// Variables globales
const PORT = process.env.PORT || 3000;
const app = express();

// Basic Config
app.use(cors());
app.use(
  "/api/checkout/webhook",
  express.raw({ type: "application/json" })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: false,
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    customSiteTitle: "E-commerce API Docs",
  }),
);

// Seeds
const runSeedIfNeeded = async () => {
  try {
    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      console.log("Base de datos vacía. Ejecutando seed...");
      const seed = require("./utils/seed.js");
      await seed.seedDatabase();
    } else {
      console.log(`Base de datos ya tiene ${bookCount} libros. Seed omitido.`);
    }
  } catch (error) {
    console.error("Error al verificar seed:", error.message);
  }
};

connectDB().then(() => runSeedIfNeeded());

// API Routes
app.get("/", (_, res) => res.send("API Ecommerce en marxa"));
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/publishers", publisherRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/checkout", checkoutRoutes);

app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));
