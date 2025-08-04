const mongoose = require('mongoose');

const jacketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand: { type: String },
  price: { type: Number, required: true },
  category: { type: String, default: 'jackets' },
  type: { type: String },
  sizes: [String],
  variants: [String],
  description: String,
  image: String
}, { timestamps: true });

const Jacket = mongoose.model('Jacket', jacketSchema);
module.exports = Jacket;