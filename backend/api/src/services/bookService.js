const Book = require("../models/bookScheme.js");
const Author = require("../models/authorScheme.js");
const Category = require("../models/categoryScheme.js");
const Publisher = require("../models/publisherScheme.js");

const getBook = async (isbn) => {
  return await Book.findOne({ isbn: isbn.toUpperCase() })
    .populate('authors', 'name slug')
    .populate('categories', 'name slug')
    .populate('publisher', 'name')
    .lean();
};

const getAllBooks = async (page = 1, limit = 20, filters = {}) => {
  const { category, type, minPrice, maxPrice, search, featured } = filters;
  
  const query = { isActive: true };
  
  if (search) {
    query.$text = { $search: search };
  }
  
  if (category && category !== 'all') {
    const cat = await Category.findOne({ slug: category });
    if (cat) {
      query.categories = cat._id;
    }
  }
  
  if (type && type !== 'all') {
    query.type_book = type;
  }
  
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }
  
  if (featured) {
    query.featured = true;
    query.unit_stock = { $gt: 0 };
  }

  const skip = (page - 1) * limit;
  
  const [data, total] = await Promise.all([
    Book.find(query)
      .populate('authors', 'name slug')
      .populate('categories', 'name slug')
      .populate('publisher', 'name')
      .skip(skip)
      .limit(limit)
      .lean(),
    Book.countDocuments(query)
  ]);

  return {
    data,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};

const searchBooks = async (query, page = 1, limit = 20) => {
  const searchRegex = new RegExp(query, 'i');
  
  const authors = await Author.find({ 
    $or: [
      { name: searchRegex },
      { slug: searchRegex }
    ]
  }).select('_id');

  const mongoQuery = {
    isActive: true,
    $or: [
      { name: searchRegex },
      { isbn: searchRegex },
      { description: searchRegex },
      { authors: { $in: authors.map(a => a._id) } }
    ]
  };

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Book.find(mongoQuery)
      .populate('authors', 'name slug')
      .populate('categories', 'name slug')
      .populate('publisher', 'name')
      .skip(skip)
      .limit(limit)
      .lean(),
    Book.countDocuments(mongoQuery)
  ]);

  return {
    data,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};

const getFeaturedBooks = async (limit = 8) => {
  return await Book.find({ isActive: true, featured: true, unit_stock: { $gt: 0 } })
    .populate('authors', 'name slug')
    .populate('categories', 'name slug')
    .populate('publisher', 'name')
    .sort({ unit_stock: -1 })
    .limit(limit)
    .lean();
};

const getBooksByCategory = async (categorySlug, page = 1, limit = 20) => {
  const category = await Category.findOne({ slug: categorySlug });
  
  if (!categorySlug || categorySlug === 'all') {
    return getAllBooks(page, limit);
  }
  
  if (!category) {
    return { data: [], pagination: { total: 0, page: 1, limit: 20, totalPages: 0 } };
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Book.find({ isActive: true, categories: category._id })
      .populate('authors', 'name slug')
      .populate('categories', 'name slug')
      .populate('publisher', 'name')
      .skip(skip)
      .limit(limit)
      .lean(),
    Book.countDocuments({ isActive: true, categories: category._id })
  ]);

  return {
    data,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1
    }
  };
};

const createBook = async (bookData) => {
  const newBook = new Book(bookData);
  return await newBook.save();
};

const updateBook = async (id, bookData) => {
  return await Book.findByIdAndUpdate(id, bookData, { new: true, runValidators: true });
};

const deleteBook = async (id) => {
  return await Book.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

const createManyBooks = async (booksData) => {
  return await Book.insertMany(booksData);
};

module.exports = {
  getBook,
  getAllBooks,
  searchBooks,
  getFeaturedBooks,
  getBooksByCategory,
  createBook,
  updateBook,
  deleteBook,
  createManyBooks,
};
