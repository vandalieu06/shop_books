const mongoose = require("mongoose");
const { Schema } = mongoose;

const publisherSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre de la editorial es obligatorio"],
    unique: true,
    trim: true,
    minlength: [2, "El nombre es demasiado corto"]
  },
  country: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, "Por favor, introduce una URL válida"]
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Publisher", publisherSchema);
