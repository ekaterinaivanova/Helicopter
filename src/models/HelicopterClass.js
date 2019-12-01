import mongoose from 'mongoose';

const { Schema } = mongoose;

const helicopterClass = new Schema({
  name: { type: String, required: true },
  level: { type: String, required: true, enum: ['A', 'B', 'C'] }
});

module.exports = mongoose.model('helicopterClass', helicopterClass);
