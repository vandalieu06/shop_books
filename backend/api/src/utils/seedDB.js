const Book = require("../models/bookScheme");
const User = require("../models/userScheme");

const bookData = require("../data/bookData");
const userData = require("../data/userData");

const seedDatabaseIfEmpty = async (Model, count, data) => {
  if (count === 0) {
    console.log("DB vacía. Insertando datos de prueba...");
    await Model.insertMany(data);
  }
};

const seedDatabase = async () => {
  try {
    const sendingTasks = [
      await seedDatabaseIfEmpty(Book, await Book.countDocuments(), bookData),
      await seedDatabaseIfEmpty(User, await User.countDocuments(), userData),
    ];
    await Promise.all(sendingTasks);
  } catch (err) {
    console.error("Error:", err.message);
  }
};

module.exports = seedDatabase;
