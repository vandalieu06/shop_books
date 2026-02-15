const paginate = (query, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return { skip, limit: parseInt(limit) };
};

const buildPaginationResponse = async (model, query = {}, page = 1, limit = 20, populateOptions = null) => {
  const { skip, limit: parsedLimit } = paginate(query, page, limit);
  
  let queryBuilder = model.find(query).skip(skip).limit(parsedLimit);
  
  if (populateOptions) {
    if (Array.isArray(populateOptions)) {
      populateOptions.forEach(opt => queryBuilder = queryBuilder.populate(opt));
    } else {
      queryBuilder = queryBuilder.populate(populateOptions);
    }
  }
  
  const [data, total] = await Promise.all([
    queryBuilder.lean(),
    model.countDocuments(query)
  ]);
  
  return {
    data,
    pagination: {
      total,
      page: parseInt(page),
      limit: parsedLimit,
      totalPages: Math.ceil(total / parsedLimit),
      hasNextPage: page * parsedLimit < total,
      hasPrevPage: page > 1
    }
  };
};

module.exports = { paginate, buildPaginationResponse };
