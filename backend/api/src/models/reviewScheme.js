const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "La puntuación es obligatoria"],
    validate: {
      validator: Number.isInteger,
      message: "La puntuación debe ser un número entero"
    }
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [1000, "El comentario no puede exceder los 1000 caracteres"]
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
    index: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verified_purchase: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

reviewSchema.index({ book: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
