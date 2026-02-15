const Publisher = require("../models/publisherScheme");
const { buildPaginationResponse } = require("../utils/pagination");

const getAll = async (page = 1, limit = 20) => {
  const query = { isActive: true };
  return await buildPaginationResponse(Publisher, query, page, limit);
};

const getById = async (id) => {
  return await Publisher.findOne({ _id: id, isActive: true }).lean();
};

const getByName = async (name) => {
  return await Publisher.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') }, isActive: true }).lean();
};

const create = async (data) => {
  const publisher = new Publisher(data);
  return await publisher.save();
};

const update = async (id, data) => {
  return await Publisher.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const remove = async (id) => {
  return await Publisher.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

const getOrCreate = async (name, country = null) => {
  let publisher = await Publisher.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
  if (!publisher) {
    publisher = await Publisher.create({ name, country });
  }
  return publisher;
};

module.exports = { getAll, getById, getByName, create, update, remove, getOrCreate };
