const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre del autor es obligatorio"],
    trim: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  biography: {
    type: String,
    maxlength: [2000, "La biografía no puede superar los 2000 caracteres"],
  },
  nationality: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    default: null
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

authorSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model("Author", authorSchema);
