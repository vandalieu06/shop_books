const mongoose = require("mongoose");
const { Schema } = mongoose;

// Subesquema para capturar el estado del libro al momento de la compra
const orderItemSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  title: String, // Guardamos el título por si el libro se borra en el futuro
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }
}, { _id: false });

const orderSchema = new Schema({
  order_code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  items: [orderItemSchema],
  total_price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },
  shippingAddress: {
    street: String,
    city: String,
    zipcode: String,
    country: String
  },
  paymentIntentId: String, // Para integraciones con Stripe/PayPal
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
