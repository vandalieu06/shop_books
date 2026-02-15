const mongoose = require("mongoose");
const { Schema } = mongoose;

// Definimos como Subdocumento (no necesita modelo propio si solo vive en el carrito)
const cartItemSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "El libro es obligatorio"],
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1, "La cantidad mínima es 1"]
  },
  priceAtPurchase: {
    type: Number,
    required: true
  },
}, { _id: false });

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
  totalItems: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

cartSchema.pre("save", function(next) {
  this.totalItems = this.items.reduce((acc, item) => acc + item.quantity, 0);
  next();
});

module.exports = {
  Cart: mongoose.model("Cart", cartSchema)
};
