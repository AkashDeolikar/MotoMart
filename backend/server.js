require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const Favorite = require('./models/Favorite');
const Part = require('./models/Parts');
const Gear = require('./models/Gear');
const RidingGear = require('./models/RidingGear');
const Glove = require('./models/Glove');
const Jacket = require('./models/Jacket');
const BaseLayer = require('./models/BaseLayer');
const RidingPant = require('./models/RidingPant');
const TailBag = require('./models/TailBag');
const SaddleBag = require('./models/SaddleBag');
const Helmet = require("./models/Helmet");
// const fetch = require("node-fetch");
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

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

/* ---------------- ChatGPT Endpoint ---------------- */
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { question } = req.body;
//     if (!question) return res.status(400).json({ error: "Question is required" });

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4o-mini", 
//         messages: [{ role: "user", content: question }],
//       }),
//     });

//     const data = await response.json();

//     if (!data.choices || !data.choices[0].message) {
//       return res.status(500).json({ error: "Invalid AI response" });
//     }

//     res.json({ answer: data.choices[0].message.content });
//   } catch (error) {
//     console.error("❌ Chat error:", error);
//     res.status(500).json({ error: "Failed to get response from AI" });
//   }
// });

app.post('/api/chat', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Question is required' });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
    });
    res.json({ answer: response.text });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Gemini API request failed' });
  }
});



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
const Car = mongoose.model('Car', carSchema);

// GET all bikes
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
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
    const car = await Car.findOne({
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
    const newCar = new Car({ brand, model, common_details, variants });
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

// POST /api/favorites
app.post('/api/favorites', async (req, res) => {
  const { userId, vehicleId, title, image, details } = req.body;

  console.log("📥 Incoming Favorite Payload:", req.body);

  if (!userId || !vehicleId) {
    console.log("❌ Missing userId or vehicleId");
    return res.status(400).json({ message: 'Missing userId or vehicleId' });
  }

  try {
    const existing = await Favorite.findOne({ userId, vehicleId });
    if (existing) {
      console.log("⚠️ Already exists");
      return res.status(409).json({ message: 'Already added to favorites.' });
    }

    const favorite = new Favorite({ userId, vehicleId, title, image, details });
    await favorite.save();

    console.log("✅ Favorite saved");
    res.status(201).json({ message: 'Favorite saved successfully' });
  } catch (err) {
    console.error('❌ Error saving favorite:', err.message, err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all favorites for a specific user
app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId });
    res.json(favorites); // This MUST return an array
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/favorites/delete/:id
app.delete('/api/favorites/delete/:id', async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Favorite deleted' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ message: 'Failed to delete favorite' });
  }
});

// API endpoint Parts.JSON
app.get('/api/parts', async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

//API endpoint for Riding Gears
app.get('/api/gears', async (req, res) => {
  try {
    const gears = await Gear.find();
    res.json(gears);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


//** DATABASE QUERY FOR RIDING ASSETS */
app.get('/api/raid-offroad', async (req, res) => {
  try {
    const gears = await RidingGear.find({ category: 'offroad' });
    res.json(gears);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch offroad gears' });
  }
});

// GET all gloves
app.get('/api/gloves', async (req, res) => {
  try {
    const gloves = await Glove.find();
    res.json(gloves);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load gloves' });
  }
});

// GET all jackets
app.get('/api/jackets', async (req, res) => {
  try {
    const jackets = await Jacket.find();
    res.json(jackets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load jackets' });
  }
});

// GET all base layers
app.get('/api/base-layers', async (req, res) => {
  try {
    const layers = await BaseLayer.find();
    res.json(layers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching base layers' });
  }
});

// GET all pants
app.get('/api/pants', async (req, res) => {
  try {
    const pants = await RidingPant.find();
    res.json(pants);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pants' });
  }
});

//GET all tail bags
app.get('/api/tail-bags', async (req, res) => {
  try {
    const data = await TailBag.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tail bags' });
  }
});

//GET all Saddles bags
app.get('/api/saddlebags', async (req, res) => {
  try {
    const bags = await SaddleBag.find();
    res.json(bags);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch saddlebags' });
  }
});

// GET helmets
app.get("/api/helmets", async (req, res) => {
  const helmets = await Helmet.find();
  res.json(helmets);
});

// Root route
app.get('/', (req, res) => {
  res.send('✅ Motomart backend is running.');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
