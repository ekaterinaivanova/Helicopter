import express from 'express';
import Helicopter from '../models/Helicopter';

const router = express.Router();


async function getHelicopter(req, res, next) {
  let helicopter;
  try {
    helicopter = await Helicopter.findById(req.params.id);
    if (helicopter == null) {
      return res.status(404).json({ message: 'Cant find helicopter' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.document = helicopter;
  next();
}

router.get('/helicopters', async (req, res) => {
  try {
    const helicopter = await Helicopter.find();
    res.json(helicopter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/helicopters/:id', getHelicopter, (req, res) => {
  res.json(res.helicopter);
});

router.post('/helicopters', async (req, res) => {
  const helicopter = new Helicopter(req.body);
  try {
    const newDocument = await helicopter.save();
    res.status(201).json(newDocument);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/helicopters/:id', getHelicopter, async (req, res) => {
  try {
    await res.helicopter.remove();
    res.json({ message: 'helicopter has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/helicopters/:id', getHelicopter, async (req, res) => {
  for (const key in req.body) {
    res.helicopter[key] = req.body[key];
  }
  try {
    const updatedDocument = await res.helicopter.save();
    res.json(updatedDocument);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
