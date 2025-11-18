const { Cart, CartItem } = require("../models/cartScheme");

const getCart = async (cartId) => {
  return await Cart.findOne({ _id: cartId }, { _id: 0, __v: 0, user: 0 })
    .populate({
      path: "items.book",
      select: "title author price imageUrl",
    })
    .lean();
};

const createCart = async (cartData) => {
  const newCart = await Cart(cartData);
  return await newCart.save();
};

const addCartItem = async (userId, dataCartItem) => {
  const updatedCart = await Cart.findOneAndUpdate(
    { user: userId },
    { $push: { items: dataCartItem } },
    { new: true, runValidators: true, upsert: true },
  );
  return updatedCart;
};

module.exports = {
  getCart,
  createCart,
  createCartItem,
  addCartItem,
};
