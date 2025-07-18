// const mongoose = require('mongoose');

// const favoriteSchema = new mongoose.Schema({
//   userId: String,
//   vehicleId: String,
//   title: String,
//   image: String,
//   details: Object,
// });

// module.exports = mongoose.model('Favorite', favoriteSchema);

const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  vehicleId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  details: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Favorite', favoriteSchema);
