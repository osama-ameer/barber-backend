const Barber = require("../models/Barber");

// Create Barber
const createBarber = async (req, res) => {
  const data = req.body;
  try {
    const barber = await Barber.create(data);
    res.status(201).send({ message: "Record Created Successfully!", barber });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all Barbers
const getBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.status(200).json({
      message: "Records fetched successfully!",
      barbers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Barber by ID
const getBarberById = async (req, res) => {
  try {
    const barber = await Barber.findOne({
      _id: req.params.id,
    });
    if (!barber) {
      return res.status(404).json({ message: "barber not found" });
    }
    res.status(200).json({
      message: "Record fetched successfully!",
      barber,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Barber
const updateBarber = async (req, res) => {
  try {
    const updateData = { ...req.body };
    const barber = await Barber.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateData }, // Use `$set` to update only provided fields
      { new: true } // Return updated document
    );
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }
    res.status(200).json({
      message: "Record Updated successfully!",
      barber,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Barber
const deleteBarber = async (req, res) => {
  try {
    const barber = await Barber.findOneAndDelete({
      _id: req.params.id,
    });
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBarber,
  getBarbers,
  getBarberById,
  updateBarber,
  deleteBarber,
};

const barberController = {
  createBarber,
  getBarbers,
  getBarberById,
  updateBarber,
  deleteBarber,
};

module.exports = barberController;
