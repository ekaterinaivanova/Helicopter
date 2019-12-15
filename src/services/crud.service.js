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
      fieldName !== 'populate' &&
      fieldName !== 'select' &&
      // eslint-disable-next-line no-prototype-builtins
      req.query.hasOwnProperty(fieldName)
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
          throw Error(`You are not allowed to filter by ${fieldName}`);
        }
      }
    }
  }
  return Model;
};
const validateFields = (Model, fields) => {
  for (const fieldName in fields) {
    if (
      !Model.schema.path(fieldName) ||
      fieldName === '_id' ||
      fieldName === '__v'
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

module.exports = {
  listItems,
  selectItems,
  filterItems,
  populateItems,
  readItem,
  createItem,
  validateFields,
  updateItem
};
