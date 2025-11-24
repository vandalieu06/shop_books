const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  order_code: { type: String, required: true, unique: true },
  state: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
  total_price: { type: Number, required: true },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [cartItemSchema],
});

module.exports = mongoose.Model("Order", orderSchema);
