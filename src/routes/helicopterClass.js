import express from 'express';
import { core } from '../controllers/core';

const router = express.Router();
const {
  fetchItem, list, read, create, deleteItem, update
} = core(
  'HelicopterClass'
);

router.get('/helicopter-classes', list);

router.get('/helicopter-classes/:id', fetchItem, read);

router.post('/helicopter-classes', create);

router.delete('/helicopter-classes/:id', fetchItem, deleteItem);

router.put('/helicopter-classes/:id', fetchItem, update);

module.exports = router;
