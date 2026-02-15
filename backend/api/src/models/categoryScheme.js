const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre de la categoría es obligatorio"],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [2, "Mínimo 2 caracteres"]
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Descripción demasiado larga"]
  },
  image: { type: String, default: null },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

categorySchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
