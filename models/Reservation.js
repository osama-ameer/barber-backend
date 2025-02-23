const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    barber: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    //   services: { type: [String], required: true }, // For multiple services (will implement in next phase)
    service: { type: String, required: true },
    barbershop: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
