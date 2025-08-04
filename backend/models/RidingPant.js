const mongoose = require('mongoose');

const ridingPantSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  price: Number,
  category: String,
  variants: [String],
  description: String,
  image: String
});

module.exports = mongoose.model('RidingPant', ridingPantSchema);