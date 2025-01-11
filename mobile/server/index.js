const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI; // Ensure MONGO_URI is set in your .env file
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define a Mongoose schema and model for bookings
const bookingSchema = new mongoose.Schema({
  carType: String,
  paintJob: String,
  additionalServices: [String],
  totalPrice: Number,
  appointmentDate: String,
  appointmentTime: String,
  carNumberPlate: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

// Routes
app.post('/api/bookings', async (req, res) => {
  const { carType, paintJob, additionalServices, totalPrice, appointmentDate, appointmentTime, carNumberPlate } = req.body;

  if (!carType || !paintJob || !appointmentDate || !appointmentTime || !carNumberPlate) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newBooking = new Booking({
    carType,
    paintJob,
    additionalServices,
    totalPrice,
    appointmentDate,
    appointmentTime,
    carNumberPlate,
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(201).json({
      message: 'Booking created successfully!',
      booking: savedBooking
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create booking.',
      error: error.message
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
