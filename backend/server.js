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



// require('dotenv').config();
// const cors = require('cors');
// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// console.log("Mongo URI:", process.env.MONGO_URI);
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log('MongoDB connection error:', err));

// // Contact Schema & Model
// const contactSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   mobile: String,
//   message: String,
//   createdAt: { type: Date, default: Date.now }
// });
// const Contact = mongoose.model('Contact', contactSchema);

// // POST route for contact feedback
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
//     console.error('Error in /api/contact:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Vehicle Model (from external file that points to 'carvehicle' collection)
// const Vehicle = require('./models/vehicle-model-backend');

// // GET: fetch all vehicle data
// app.get('/api/vehicles', async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find();
//     res.json(vehicles);
//   } catch (error) {
//     console.error('Error fetching vehicles:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // OPTIONAL: GET route with search by manufacturer/model
// app.get('/api/vehicles/search', async (req, res) => {
//   const { manufacturer, model } = req.query;

//   try {
//     const query = {};
//     if (manufacturer) {
//       query.manufacturer = { $regex: manufacturer, $options: 'i' };
//     }
//     if (model) {
//       query['vehicles.vehicleInfo.model'] = { $regex: model, $options: 'i' };
//     }

//     const vehicles = await Vehicle.find(query);
//     res.json(vehicles);
//   } catch (error) {
//     console.error('Error during search:', error);
//     res.status(500).json({ error: 'Search failed' });
//   }
// });
// // ✅ Add this root route before app.listen()
// app.get('/', (req, res) => {
//   res.send('✅ Motomart backend is running.');
// });
// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}/api/vehicles`);
// });



require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// === MongoDB Connection ===
const dbURI = process.env.MONGO_URI
  .replace('${DB_USER}', process.env.DB_USER)
  .replace('${DB_PASS}', process.env.DB_PASS)
  .replace('${DB_NAME}', process.env.DB_NAME);

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// === Contact Schema ===
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

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

// === Bike Schema & Routes ===
const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  common_details: Object,
  variants: Object
});
const Car = mongoose.model('Bike', carSchema);

// GET all bikes
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Bike.find();
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

// GET bike by brand and model (strict match, now case-insensitive)
app.get('/api/cars/:brand/:model', async (req, res) => {
  const { brand, model } = req.params;
  try {
    const car = await Bike.findOne({
      brand: { $regex: new RegExp(`^${brand}$`, 'i') },
      model: { $regex: new RegExp(`^${model}$`, 'i') }
    });
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// SEARCH bikes by brand and/or model (partial, case-insensitive)
app.get('/api/cars/search', async (req, res) => {
  const { brand, model } = req.query;
  try {
    const query = {};
    if (brand) query.brand = { $regex: brand, $options: 'i' };
    if (model) query.model = { $regex: model, $options: 'i' };

    const cars = await Car.find(query);
    res.json(cars);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// POST new bike (admin/testing)
app.post('/api/cars', async (req, res) => {
  try {
    const { brand, model, common_details, variants } = req.body;
    const newBike = new Car({ brand, model, common_details, variants });
    await newCar.save();
    res.status(201).json({ message: 'car added successfully' });
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({ error: 'Failed to add car' });
  }
});

//-----------***------------
// === Bike Schema & Routes ===
const bikeSchema = new mongoose.Schema({
  brand: String,
  model: String,
  common_details: Object,
  variants: Object
});
const Bike = mongoose.model('Bike', bikeSchema);

// GET all bikes
app.get('/api/bikes', async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (error) {
    console.error('Error fetching bikes:', error);
    res.status(500).json({ error: 'Failed to fetch bikes' });
  }
});

// GET bike by brand and model (strict match, now case-insensitive)
app.get('/api/bikes/:brand/:model', async (req, res) => {
  const { brand, model } = req.params;
  try {
    const bike = await Bike.findOne({
      brand: { $regex: new RegExp(`^${brand}$`, 'i') },
      model: { $regex: new RegExp(`^${model}$`, 'i') }
    });
    if (!bike) return res.status(404).json({ error: 'Bike not found' });
    res.json(bike);
  } catch (error) {
    console.error('Error fetching bike:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// SEARCH bikes by brand and/or model (partial, case-insensitive)
app.get('/api/bikes/search', async (req, res) => {
  const { brand, model } = req.query;
  try {
    const query = {};
    if (brand) query.brand = { $regex: brand, $options: 'i' };
    if (model) query.model = { $regex: model, $options: 'i' };

    const bikes = await Bike.find(query);
    res.json(bikes);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// POST new bike (admin/testing)
app.post('/api/bikes', async (req, res) => {
  try {
    const { brand, model, common_details, variants } = req.body;
    const newBike = new Bike({ brand, model, common_details, variants });
    await newBike.save();
    res.status(201).json({ message: 'Bike added successfully' });
  } catch (error) {
    console.error('Error adding bike:', error);
    res.status(500).json({ error: 'Failed to add bike' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('✅ Motomart backend is running.');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
