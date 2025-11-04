const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  date_add: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
});

module.exports = mongoose.Model("Wishlist", wishlistSchema);
