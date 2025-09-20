// models/vehicle-model-backend.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  manufacturer: String,
  idPrefix: String,
  vehicles: [
    {
      id: String,
      videoPoster: String,
      videoSrc: String,
      thumbnail: String,
      title: String,
      link: String,
      description: String,
      buttonText: String,
      vehicleInfo: {
        model: String,
        manufacturer: String,
        year: Number,
        features: [String],
        price: String
      }
    }
  ]
});

//  Important: force Mongoose to use `carvehicle` collection
module.exports = mongoose.model('Vehicle', vehicleSchema, 'carvehicle');
