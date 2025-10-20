const Book = require("../models/bookScheme");
const bookData = require("../data/bookData");

const User = require("../models/userScheme");
const userData = require("../data/userData");

const seedDatabase = async () => {
  try {
    const bookCount = await Book.countDocuments();
    const userCount = await User.countDocuments();

    if (bookCount === 0) {
      console.log("DB vacía. Insertando datos de prueba...");
      await Book.insertMany(bookData);
      console.log("Book - Datos de prueba insertados correctamente.");
    }

    if (userCount === 0) {
      console.log("DB vacía. Insertando datos de prueba...");
      await User.insertMany(userData);
      console.log("Usuario - Datos de prueba insertados correctamente.");
    }
  } catch (err) {
    console.error("Error en el proceso de Seeding:", err.message);
  }
};

module.exports = seedDatabase;
