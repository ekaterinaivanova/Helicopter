import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const { Schema } = mongoose;

const helicopter = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  year: {
    type: Number,
    required: true,
    min: [1988, 'This helicopter is too old'],
    validate: {
      validator: value => {
        const currentYear = new Date().getFullYear();
        if (value > currentYear) {
          return false;
        }
        return true;
      },
      message: "This helicopter doesn't exist yet."
    }
  },
  numberOfBlades: { type: Number, required: true },
  color: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'helicopterClass'
  }
});

helicopter.plugin(autopopulate);

module.exports = mongoose.model('helicopters', helicopter);
