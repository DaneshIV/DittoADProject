const express = require('express');
const Booking = require('../models/bookingModel');
const router = express.Router();

// POST route to create a booking
router.post('/bookings', async (req, res) => {
  try {
    const { carType, paintJob, additionalServices, totalPrice, appointmentDate, appointmentTime, carNumberPlate } = req.body;

    // Create new booking object
    const newBooking = new Booking({
      carType,
      paintJob,
      additionalServices,
      totalPrice,
      appointmentDate,
      appointmentTime,
      carNumberPlate,
    });

    // Save booking to the database
    await newBooking.save();
    res.status(201).send('Booking confirmed!');
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).send('Failed to save booking. Please try again.');
  }
});

router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings. Please try again.' });
  }
});


module.exports = router;
