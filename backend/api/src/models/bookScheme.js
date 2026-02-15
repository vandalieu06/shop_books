const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  isbn: {
    type: String,
    unique: true,
    required: [true, "El ISBN es obligatorio"],
    trim: true,
    uppercase: true,
  },
  name: {
    type: String,
    required: [true, "El título es obligatorio"],
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000,
  },
  price: {
    type: Number,
    required: [true, "El precio es obligatorio"],
    min: [0, "El precio no puede ser negativo"],
  },
  unit_stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  language: {
    type: String,
    enum: {
      values: ["es", "en", "jp", "fr", "de", "it", "pt", "zh", "ko", "ru"],
      message: "{VALUE} no es un idioma soportado",
    },
    default: "es",
  },
  type_book: {
    type: String,
    enum: ["digital", "fisico"],
    required: true,
  },
  publisher: {
    type: Schema.Types.ObjectId,
    ref: "Publisher",
  },
  authors: [{
    type: Schema.Types.ObjectId,
    ref: "Author",
  }],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: "Category",
  }],
  image: { type: String, default: null },
  featured: { type: Boolean, default: false },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

bookSchema.index({ name: 'text', description: 'text', isbn: 'text' });

module.exports = mongoose.model("Book", bookSchema);
