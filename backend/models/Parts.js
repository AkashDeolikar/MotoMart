const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  part: String,
  type: String,
  brands: [String],
  priceRange: String,
  spec: String
});

module.exports = mongoose.model('Part', partSchema);
