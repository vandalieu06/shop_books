const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El usuario es obligatorio"],
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "El libro es obligatorio"],
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

wishlistSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model("Wishlist", wishlistSchema);
