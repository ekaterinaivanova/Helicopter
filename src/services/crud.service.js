const listItems = Model => Model.find();

const populateItems = (Model, req) => {
  const { populate = '' } = req.query;
  populate.split(',').forEach(populateField => {
    Model.populate(populateField);
  });
  return Model;
};

const selectItems = (Model, req) => {
  const { select = '' } = req.query;
  select.split(',').forEach(populateField => {
    Model.select(populateField);
  });
  return Model;
};

const filterItems = (Model, req) => {
  for (const fieldName in req.query) {
    // eslint-disable-next-line no-prototype-builtins
    if (
      fieldName !== 'populate'
      && fieldName !== 'select'
      // eslint-disable-next-line no-prototype-builtins
      && req.query.hasOwnProperty(fieldName)
    ) {
      if (req.query[fieldName]) {
        const schemaAttribute = Model.schema.path(fieldName);
        if (schemaAttribute) {
          switch (Model.schema.path(fieldName).instance) {
            case 'String':
              Model.find({
                [fieldName]: { $regex: new RegExp(req.query[fieldName]) }
              });
              break;
            case 'Number':
            case 'Boolean':
              Model.where(fieldName).equals(req.query[fieldName]);
              break;
            default:
          }
        } else {
          switch (fieldName) {
            case 'page':
            case 'limit':
              req.query[fieldName] = Number(req.query[fieldName]);
              // eslint-disable-next-line no-restricted-globals
              if (isNaN(req.query[fieldName])) {
                throw Error(`${fieldName} should be a number`);
              } else if (!Number.isInteger(Number(req.query[fieldName]))) {
                throw Error(`${fieldName} should be an integer`);
              } else if (req.query[fieldName] <= 0) {
                throw Error(`${fieldName} should be a positive integer`);
              }
              break;
            default:
              throw Error(`You are not allowed to filter by ${fieldName}`);
          }
        }
      }
    }
  }
  return Model;
};
const validateFields = (Model, fields) => {
  for (const fieldName in fields) {
    if (
      !Model.schema.path(fieldName)
      || fieldName === '_id'
      || fieldName === '__v'
    ) {
      throw Error(`Unknown field ${fieldName}`);
    }
  }
};

const readItem = (Model, req) => Model.findById(req.params.id);
const createItem = (Model, req) => {
  const helicopter = new Model(req.body);
  return helicopter.save();
};
const updateItem = (Model, req) => {
  for (const key in req.body) {
    // eslint-disable-next-line no-param-reassign
    Model[key] = req.body[key];
  }
  return Model.save();
};

const paginateList = async (Model, req) => {
  const page = req.query.page ? req.query.page - 1 : 0;
  const limit = req.query.limit ? req.query.limit : 3;
  const results = await Model.skip(page * (limit + 1)).limit(limit + 1);
  // limit + 1 to detect if there are more items than the limit
  const hasNext = results.length > limit;
  const hasPrevious = page !== 0;
  if (hasNext) {
    results.splice(results.length - 1, 1);
  }
  return {
    results,
    pagination: {
      hasNext,
      hasPrevious
    }
  };
};

module.exports = {
  listItems,
  selectItems,
  filterItems,
  populateItems,
  readItem,
  createItem,
  validateFields,
  updateItem,
  paginateList
};
