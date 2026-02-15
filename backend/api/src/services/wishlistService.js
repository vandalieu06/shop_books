const Wishlist = require("../models/wishlistScheme");

const getByUser = async (userId) => {
  return await Wishlist.find({ user: userId })
    .populate({
      path: 'book',
      select: 'name isbn price image averageRating unit_stock type_book'
    })
    .sort({ addedAt: -1 })
    .lean();
};

const add = async (userId, bookId) => {
  const existing = await Wishlist.findOne({ user: userId, book: bookId });
  if (existing) {
    return existing;
  }
  
  const wishlistItem = new Wishlist({ user: userId, book: bookId });
  return await wishlistItem.save();
};

const remove = async (userId, bookId) => {
  return await Wishlist.findOneAndDelete({ user: userId, book: bookId });
};

const check = async (userId, bookId) => {
  const item = await Wishlist.findOne({ user: userId, book: bookId });
  return !!item;
};

const clear = async (userId) => {
  return await Wishlist.deleteMany({ user: userId });
};

module.exports = { getByUser, add, remove, check, clear };
