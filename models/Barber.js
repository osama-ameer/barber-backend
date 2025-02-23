const mongoose = require("mongoose");

const barberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    // service: { type: String, required: true },
    // barbershop: { type: String, required: true },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Barber", barberSchema);
