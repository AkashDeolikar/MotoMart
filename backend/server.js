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
.catch((err) => console.log(err));

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


// Vehicle Schema & Model
const vehicleSchema = new mongoose.Schema({
  manufacturer: String,
  idPrefix: String,
  vehicles: [
    {
      id: String,
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
        price: String,
      },
    },
  ],
});

const Vehicle = mongoose.model('vehicle', vehicleSchema); // 👈 Matches MongoDB collection name


// GET route to fetch vehicle data grouped by manufacturer
// app.get('/api/vehicles', async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find();
//     res.json(vehicles); // Send full vehicle docs, already grouped by manufacturer
//   } catch (error) {
//     console.error('Error fetching vehicles:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });
// GET route to fetch vehicle data
app.get('/api/vehicles', async (req, res) => {
  console.log('GET /api/vehicles hit'); // 👈 Add this log!
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api/vehicles`);
});
