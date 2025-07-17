const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  brand: String,
  model: String,
  common_details: Object,
  variants: Object
});

module.exports = mongoose.model('Bike', bikeSchema);
