const mongoose = require('mongoose');

const TailBagSchema = new mongoose.Schema({
  title: String,
  slug: String,
  price: Number,
  category: String,
  variants: [String],
  description: String,
  image: String
});

module.exports = mongoose.model('TailBag', TailBagSchema);