const mongoose = require("mongoose");
const { Schema } = mongoose;

const publisherSchema = new Schema({
  name: { type: String, required: true },
  country: String,
  website: String,
});

module.exports = mongoose.Model("Publisher", publisherSchema);
