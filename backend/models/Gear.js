const mongoose = require('mongoose');

const gearSchema = new mongoose.Schema({
  type: String,
  brand: String,
  model: String,
  price: Number,
  imageUrl: String,
  certification: String,
  compatibleBikes: [String],
  features: [String],
  rating: Number,
  productLink: String // 🔗 new field
});

module.exports = mongoose.model('Gear', gearSchema);