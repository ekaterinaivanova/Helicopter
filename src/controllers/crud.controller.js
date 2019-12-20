import {
  listItems,
  selectItems,
  filterItems,
  populateItems,
  readItem,
  createItem,
  validateFields,
  updateItem,
  paginateList
} from '../services/crud.service';

function core(routeName) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const Model = require(`../models/${routeName}`);

  const list = async (req, res) => {
    try {
      let items = listItems(Model, req);
      items = filterItems(items, req);
      items = selectItems(items, req);
      items = populateItems(items, req);
      const { pagination, results } = await paginateList(items, req);
      console.log('pagination, result', pagination, results);
      res.json({ results, pagination });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const read = async (req, res) => {
    res.json(res.__fetchedItem);
  };

  const create = async (req, res) => {
    try {
      validateFields(Model, req.body);
      const newHelicopter = await createItem(Model, req);
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
    try {
      validateFields(Model, req.body);
      const updatedItem = await updateItem(res.__fetchedItem, req);
      res.json(updatedItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  const fetchItem = async (req, res, next) => {
    let fetchedItem;
    try {
      fetchedItem = readItem(Model, req);
      fetchedItem = selectItems(fetchedItem, req);
      fetchedItem = await populateItems(fetchedItem, req);
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
