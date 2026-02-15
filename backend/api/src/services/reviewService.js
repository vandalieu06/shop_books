const Review = require("../models/reviewScheme");
const Book = require("../models/bookScheme");
const { buildPaginationResponse } = require("../utils/pagination");

const getByBook = async (bookId, page = 1, limit = 20) => {
  const query = { book: bookId, isActive: true };
  return await buildPaginationResponse(Review, query, page, limit, { path: 'user', select: 'first_name last_name avatar' });
};

const getByUser = async (userId) => {
  return await Review.find({ user: userId, isActive: true })
    .populate('book', 'name image')
    .sort({ createdAt: -1 })
    .lean();
};

const create = async (data) => {
  const existingReview = await Review.findOne({ book: data.book, user: data.user });
  if (existingReview) {
    throw new Error("Ya has valorado este libro");
  }
  
  const review = new Review(data);
  await review.save();
  
  await updateBookRating(data.book);
  
  return review;
};

const update = async (id, userId, data) => {
  const review = await Review.findOneAndUpdate(
    { _id: id, user: userId },
    { rating: data.rating, comment: data.comment },
    { new: true, runValidators: true }
  );
  
  if (review) {
    await updateBookRating(review.book);
  }
  
  return review;
};

const remove = async (id, userId) => {
  const review = await Review.findOneAndUpdate(
    { _id: id, user: userId },
    { isActive: false },
    { new: true }
  );
  
  if (review) {
    await updateBookRating(review.book);
  }
  
  return review;
};

const updateBookRating = async (bookId) => {
  const stats = await Review.aggregate([
    { $match: { book: bookId, isActive: true } },
    {
      $group: {
        _id: '$book',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    await Book.findByIdAndUpdate(bookId, {
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      totalReviews: stats[0].totalReviews
    });
  } else {
    await Book.findByIdAndUpdate(bookId, {
      averageRating: 0,
      totalReviews: 0
    });
  }
};

module.exports = { getByBook, getByUser, create, update, remove };
