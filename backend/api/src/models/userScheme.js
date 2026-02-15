const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
    minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    maxlength: [100, "El nombre es demasiado largo"],
  },
  last_name: {
    type: String,
    required: [true, "El apellido es obligatorio"],
    trim: true,
    minlength: [2, "El apellido debe tener al menos 2 caracteres"],
  },
  username: {
    type: String,
    required: [true, "El usuario es obligatorio"],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [4, "El usuario debe tener al menos 4 caracteres"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Por favor, introduce un email válido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    select: false,
  },
  birthdate: {
    type: Date,
  },
  phone_number: {
    type: String,
    trim: true,
  },
  avatar: { type: String, default: null },
  address: [{
    address_name: String,
    city: String,
    zipcode: String,
    country: String,
    isDefault: { type: Boolean, default: false }
  }],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  isActive: { type: Boolean, default: true },
  refreshToken: { type: String, select: false }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
