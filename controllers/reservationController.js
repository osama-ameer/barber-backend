const Reservation = require("../models/Reservation");
const sendEmail = require("../utils/sendEmail");

// Create Reservation
const createReservation = async (req, res) => {
  const data = req.body;
  try {
    const reservation = await Reservation.create(data);
    // Send email
    await sendEmail({
      email: data?.email,
      subject: "Reservation Confirmation",
      message: `Your reservation at ${data?.barbershop} with ${data?.barber} on ${data?.date} at ${data?.time} is confirmed.`,
    });
    res
      .status(201)
      .send({ message: "Record Created Successfully!", reservation });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all Reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json({
      message: "Records fetched successfully!",
      reservations,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Reservation by ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
    });
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({
      message: "Record fetched successfully!",
      reservation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Reservation
const updateReservation = async (req, res) => {
  try {
    const updateData = { ...req.body };
    const reservation = await Reservation.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateData }, // Use `$set` to update only provided fields
      { new: true } // Return updated document
    );
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Send email
    await sendEmail({
      email: updateData?.email,
      subject: "Reservation Updated",
      message: `Your reservation is updated. Kindly review the changes: \n Your new reservation is at ${updateData?.barbershop} with ${updateData?.barber} on ${updateData?.date} at ${updateData?.time} is confirmed.`,
    });
    res.status(200).json({
      message: "Record Updated successfully!",
      reservation,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Reservation
const deleteReservation = async (req, res) => {
  try {
    const existingReservation = await Reservation.findOne({
      _id: req.params.id,
    });
    if (!existingReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    const reservation = await Reservation.findOneAndDelete({
      _id: req.params.id,
    });

    // Send email
    await sendEmail({
      email: existingReservation?.email,
      subject: "Reservation Cancelled",
      message: `Your reservation is cancelled due to some reason. Kindly contact us for more details.`,
    });
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};

const reservationController = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};

module.exports = reservationController;
