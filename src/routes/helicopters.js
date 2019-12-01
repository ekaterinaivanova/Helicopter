import express from 'express';
import { core } from '../controllers/core';

const router = express.Router();
const {
  fetchItem, list, read, create, deleteItem, update
} = core(
  'Helicopter'
);

router.get('/helicopters', list);

router.get('/helicopters/:id', fetchItem, read);

router.post('/helicopters', create);

router.delete('/helicopters/:id', fetchItem, deleteItem);

router.put('/helicopters/:id', fetchItem, update);

module.exports = router;
