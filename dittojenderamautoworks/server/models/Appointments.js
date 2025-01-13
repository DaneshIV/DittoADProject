import mongoose from "mongoose";

// Appointment Schema
const AppointmentSchema = new mongoose.Schema(
  {
    carType: {
      type: String,
      required: true,
    },
    paintJob: {
      type: String,
      required: true,
    },
    additionalServices: {
      type: Array,
      default: [],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    carNumberPlate: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const Appointments = mongoose.model("Appointments", AppointmentSchema, "bookings");

export default Appointments;
