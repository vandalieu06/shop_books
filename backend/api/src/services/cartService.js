const { Cart } = require("../models/cartScheme");

const getCart = async (userId) => {
  return await Cart.findOne({ user: userId })
    .populate({
      path: "items.book",
      select: "name isbn price image unit_stock",
    })
    .lean();
};

const createCart = async (cartData) => {
  const newCart = new Cart(cartData);
  return await newCart.save();
};

const addCartItem = async (userId, item) => {
  let cart = await Cart.findOne({ user: userId });
  
  if (!cart) {
    cart = new Cart({ user: userId, items: [item] });
    return await cart.save();
  }
  
  const existingItemIndex = cart.items.findIndex(
    i => i.book.toString() === item.book.toString()
  );
  
  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += item.quantity;
  } else {
    cart.items.push(item);
  }
  
  return await cart.save();
};

const removeCartItem = async (userId, bookId) => {
  return await Cart.findOneAndUpdate(
    { user: userId },
    { $pull: { items: { book: bookId } } },
    { new: true }
  );
};

const clearCart = async (userId) => {
  return await Cart.findOneAndUpdate(
    { user: userId },
    { items: [] },
    { new: true }
  );
};

module.exports = {
  getCart,
  createCart,
  addCartItem,
  removeCartItem,
  clearCart,
};
