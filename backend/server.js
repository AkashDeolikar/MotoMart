// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// console.log("Mongo URI:", process.env.MONGO_URI);
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log(err));

// // Define schema & model for contact form
// const contactSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   mobile: String,
//   message: String,
//   createdAt: { type: Date, default: Date.now }
// });

// const Contact = mongoose.model('Contact', contactSchema);

// // Routes
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, mobile, message } = req.body;
//     if (!name || !email || !mobile || !message) {
//       return res.status(400).json({ error: 'Please fill all fields' });
//     }
//     const newContact = new Contact({ name, email, mobile, message });
//     await newContact.save();
//     res.status(201).json({ message: 'Feedback saved successfully' });
//   } catch (error) {
//     console.error('Error in /api/contact:', error); // 👈 ADD THIS LINE
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log("Mongo URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Contact Schema & Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// POST route for contact feedback
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;
    if (!name || !email || !mobile || !message) {
      return res.status(400).json({ error: 'Please fill all fields' });
    }
    const newContact = new Contact({ name, email, mobile, message });
    await newContact.save();
    res.status(201).json({ message: 'Feedback saved successfully' });
  } catch (error) {
    console.error('Error in /api/contact:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Vehicle Model (from external file that points to 'carvehicle' collection)
const Vehicle = require('./models/vehicle-model-backend');

// GET: fetch all vehicle data
app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// OPTIONAL: GET route with search by manufacturer/model
app.get('/api/vehicles/search', async (req, res) => {
  const { manufacturer, model } = req.query;

  try {
    const query = {};
    if (manufacturer) {
      query.manufacturer = { $regex: manufacturer, $options: 'i' };
    }
    if (model) {
      query['vehicles.vehicleInfo.model'] = { $regex: model, $options: 'i' };
    }

    const vehicles = await Vehicle.find(query);
    res.json(vehicles);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});
// ✅ Add this root route before app.listen()
app.get('/', (req, res) => {
  res.send('✅ Motomart backend is running.');
});
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/api/vehicles`);
});
