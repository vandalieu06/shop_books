const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    maxlength: [100, "El nombre no puede superar 100 caracteres"],
  },
  last_name: {
    type: String,
    required: [true, "El apellido es obligatorio"],
    minlength: [2, "El apellido debe tener al menos 2 caracteres"],
    maxlength: [200, "El apellido no puede superar 200 caracteres"],
  },
  username: {
    type: String,
    required: [true, "El usuario es obligatorio"],
    unique: [true, "El usuario ya existe"],
    minlength: [4, "El usuario debe tener al menos 4 caracteres"],
    maxlength: [16, "El usuario no puede superar 16 caracteres"],
  },
  birthdate: {
    type: Date,
    required: [true, "La fecha de nacimiento es obligatoria"],
    validate: {
      validator: (v) => v < Date.now(),
      message: "La fecha de nacimiento no puede ser en el futuro",
    },
  },
  phone_number: {
    type: String,
    required: [true, "El teléfono es obligatorio"],
    maxlength: [20, "El teléfono no puede superar 20 caracteres"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: [true, "El email ya existe"],
    index: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  address: [
    {
      adress_name: { type: String },
      city: { type: String },
      zipcode: { type: String },
      country: { type: String },
    },
  ],
  cart: {
    type: mongoose.Schema.ObjectId,
    ref: "Cart",
  },
});

// Hasheamos la password si está se ha introducido por primera vez
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
