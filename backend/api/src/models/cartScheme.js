const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
  price: Number,
});

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
});

module.exports = {
  Cart: mongoose.model("Cart", cartSchema),
  CartItem: mongoose.model("CartItem", cartItemSchema),
};
