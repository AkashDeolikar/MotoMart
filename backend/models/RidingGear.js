// models/RidingGear.js
const mongoose = require('mongoose');

const gearSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  category: { type: String, default: 'offroad' },
  variants: [String],
  description: String,
  image: String
}, { timestamps: true });

const RidingGear = mongoose.model('RidingGear', gearSchema);

module.exports = RidingGear;
