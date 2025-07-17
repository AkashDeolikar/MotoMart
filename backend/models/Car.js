const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  brand: String,
  model: String,
  common_details: Object,
  variants: Object
});

module.exports = mongoose.model('Car', carSchema);
