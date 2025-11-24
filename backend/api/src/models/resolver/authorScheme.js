const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.Model("Author", authorSchema);
