const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});

module.exports = mongoose.Model("Category", categorySchema);
