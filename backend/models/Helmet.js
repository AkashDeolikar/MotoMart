const mongoose = require("mongoose");

const HelmetSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  brand: String,
  type: String,
  price_inr: Number,
  image: String,
  link: String,
});

module.exports = mongoose.model("Helmet", HelmetSchema);
