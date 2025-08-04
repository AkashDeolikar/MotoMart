// ===== models/Glove.js =====
const mongoose = require('mongoose');

const gloveSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand: { type: String },
  price: { type: Number, required: true },
  category: { type: String, default: 'gloves' },
  type: { type: String }, // riding or winter
  sizes: [String],
  variants: [String],
  description: String,
  image: String
}, { timestamps: true });

const Glove = mongoose.model('Glove', gloveSchema);
module.exports = Glove;