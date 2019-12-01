function core(routeName) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const Model = require(`../models/${routeName}`);
  const list = async (req, res) => {
    try {
      const items = Model.find();
      const { populate = '', select = '' } = req.query;
      for (const fieldName in req.query) {
        // eslint-disable-next-line no-prototype-builtins
        if (
          fieldName !== 'populate'
          && fieldName !== 'select'
          // eslint-disable-next-line no-prototype-builtins
          && req.query.hasOwnProperty(fieldName)
        ) {
          if (req.query[fieldName]) {
            switch (Model.schema.path(fieldName).instance) {
              case 'String':
                items.find({
                  [fieldName]: { $regex: new RegExp(req.query[fieldName]) }
                });
                break;
              case 'Number':
              case 'Boolean':
                items.where(fieldName).equals(req.query[fieldName]);
                break;
              default:
            }
          }
        }
      }

      populate.split(',').forEach(populateField => {
        items.populate(populateField);
      });

      select.split(',').forEach(populateField => {
        items.select(populateField);
      });
      const filteredItems = await items;
      res.json(filteredItems);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const read = async (req, res) => {
    res.json(res.__fetchedItem);
  };

  const create = async (req, res) => {
    const helicopter = new Model(req.body);
    try {
      const newHelicopter = await helicopter.save();
      res.status(201).json(newHelicopter);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  const deleteItem = async (req, res) => {
    try {
      await res.__fetchedItem.remove();
      res.json({ message: `${routeName} has been deleted` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  const update = async (req, res) => {
    for (const key in req.body) {
      res.__fetchedItem[key] = req.body[key];
    }
    try {
      const updatedItem = await res.__fetchedItem.save();
      res.json(updatedItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  const fetchItem = async (req, res, next) => {
    let fetchedItem;
    try {
      fetchedItem = await Model.findById(req.params.id);
      if (fetchedItem == null) {
        return res.status(404).json({ message: `Cant find ${routeName}` });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.__fetchedItem = fetchedItem;
    next();
  };

  return {
    fetchItem,
    list,
    read,
    create,
    update,
    deleteItem
  };
}

module.exports = { core };
