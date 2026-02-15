const Category = require("../models/categoryScheme");
const { buildPaginationResponse } = require("../utils/pagination");

const getAll = async (page = 1, limit = 20) => {
  const query = { isActive: true };
  return await buildPaginationResponse(Category, query, page, limit);
};

const getById = async (id) => {
  return await Category.findOne({ _id: id, isActive: true }).lean();
};

const getBySlug = async (slug) => {
  return await Category.findOne({ slug, isActive: true }).lean();
};

const getByName = async (name) => {
  return await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') }, isActive: true }).lean();
};

const create = async (data) => {
  const category = new Category(data);
  return await category.save();
};

const update = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const remove = async (id) => {
  return await Category.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

const getOrCreate = async (name) => {
  let category = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
  if (!category) {
    category = await Category.create({ name });
  }
  return category;
};

module.exports = { getAll, getById, getBySlug, getByName, create, update, remove, getOrCreate };
