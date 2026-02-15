require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Author = require("../models/authorScheme");
const Category = require("../models/categoryScheme");
const Publisher = require("../models/publisherScheme");
const Book = require("../models/bookScheme");
const User = require("../models/userScheme");
const Review = require("../models/reviewScheme");

const authorData = require("../data/authorData");
const categoryData = require("../data/categoryData");
const publisherData = require("../data/publisherData");
const bookData = require("../data/bookData");

const generateSlug = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const seedDatabase = async (skipConnect = false) => {
  const MONGODB_URI = process.env.MONGO_URI || "mongodb://admin:admin@localhost:27017/ecommerce?authSource=admin";
  
  try {
    if (!skipConnect) {
      console.log("Conectando a MongoDB...");
      await mongoose.connect(MONGODB_URI);
      console.log("✓ Conexión establecida");
    } else {
      console.log("✓ Usando conexión existente");
    }

    console.log("\n--- Limpiando colecciones ---");
    await Promise.all([
      Review.deleteMany({}),
      Book.deleteMany({}),
      Author.deleteMany({}),
      Category.deleteMany({}),
      Publisher.deleteMany({}),
      User.deleteMany({ email: { $ne: "admin@test.com" } })
    ]);
    console.log("✓ Colecciones limpiadas");

    console.log("\n--- Insertando Categories ---");
    const categoriesWithSlug = categoryData.map(cat => ({ ...cat, slug: generateSlug(cat.name) }));
    const categories = await Category.insertMany(categoriesWithSlug);
    console.log(`✓ ${categories.length} categorías insertadas`);

    console.log("\n--- Insertando Publishers ---");
    const publishers = await Publisher.insertMany(publisherData);
    console.log(`✓ ${publishers.length} editoriales insertadas`);

    console.log("\n--- Insertando Authors ---");
    const authorsWithSlug = authorData.map(auth => ({ ...auth, slug: generateSlug(auth.name) }));
    const authors = await Author.insertMany(authorsWithSlug);
    console.log(`✓ ${authors.length} autores insertados`);

    console.log("\n--- Asignando referencias a Books ---");
    const booksWithRefs = bookData.map((book, index) => {
      const authorIndex = index % authors.length;
      const categoryIndex = index % categories.length;
      const publisherIndex = index % publishers.length;

      return {
        ...book,
        authors: [authors[authorIndex]._id],
        categories: [categories[categoryIndex]._id],
        publisher: publishers[publisherIndex]._id,
        active: true,
        isActive: true,
        year_publish: new Date(book.year_publish)
      };
    });

    console.log("\n--- Insertando Books ---");
    const books = await Book.insertMany(booksWithRefs);
    console.log(`✓ ${books.length} libros insertados`);

    console.log("\n--- Creando Usuario Demo ---");
    const demoUser = new User({
      first_name: "Usuario",
      last_name: "Demo",
      username: "demouser",
      email: "demo@test.com",
      password: "password123",
      role: "user",
      isActive: true
    });
    await demoUser.save();
    console.log("✓ Usuario demo creado (demo@test.com / password123)");

    console.log("\n--- Insertando Reviews de ejemplo ---");
    const sampleReviews = [
      {
        rating: 5,
        comment: "¡Una obra maestra! No pude dejar de leerlo.",
        book: books[1]._id,
        user: demoUser._id,
        verified_purchase: true,
        isActive: true
      },
      {
        rating: 4,
        comment: "Muy buen libro, recomendable para todos los públicos.",
        book: books[4]._id,
        user: demoUser._id,
        verified_purchase: true,
        isActive: true
      },
      {
        rating: 5,
        comment: "La mejor novela de fantasía que he leído.",
        book: books[14]._id,
        user: demoUser._id,
        verified_purchase: true,
        isActive: true
      },
      {
        rating: 3,
        comment: "Interesante pero un poco largo.",
        book: books[12]._id,
        user: demoUser._id,
        verified_purchase: false,
        isActive: true
      }
    ];
    await Review.insertMany(sampleReviews);
    console.log("✓ Reseñas insertadas");

    console.log("\n========================================");
    console.log("✅ SEED COMPLETADO EXITOSAMENTE");
    console.log("========================================");
    console.log("\nDatos insertados:");
    console.log(`  - ${categories.length} categorías`);
    console.log(`  - ${publishers.length} editoriales`);
    console.log(`  - ${authors.length} autores`);
    console.log(`  - ${books.length} libros`);
    console.log(`  - 1 usuario demo`);
    console.log(`  - ${sampleReviews.length} reseñas`);
    console.log("\nUsuario demo: demo@test.com / password123");

  } catch (error) {
    console.error("❌ Error durante el seed:", error);
  }
};

module.exports = { seedDatabase };
