const mongoose = require('mongoose');

// Define the schema for the booking
const bookingSchema = new mongoose.Schema({
  carType: String,
  paintJob: String,
  additionalServices: [String],
  totalPrice: Number,
  appointmentDate: Date,
  appointmentTime: String,
  carNumberPlate: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
