const Author = require("../models/authorScheme");
const { buildPaginationResponse } = require("../utils/pagination");

const getAll = async (page = 1, limit = 20, search = '') => {
  const query = { isActive: true };
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { biography: { $regex: search, $options: 'i' } }
    ];
  }
  return await buildPaginationResponse(Author, query, page, limit);
};

const getById = async (id) => {
  return await Author.findOne({ _id: id, isActive: true }).lean();
};

const getBySlug = async (slug) => {
  return await Author.findOne({ slug, isActive: true }).lean();
};

const create = async (data) => {
  const author = new Author(data);
  return await author.save();
};

const update = async (id, data) => {
  return await Author.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const remove = async (id) => {
  return await Author.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

const getOrCreate = async (name) => {
  let author = await Author.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
  if (!author) {
    author = await Author.create({ name });
  }
  return author;
};

module.exports = { getAll, getById, getBySlug, create, update, remove, getOrCreate };
