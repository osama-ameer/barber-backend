const express = require("express");
const barberController = require("../controllers/barberController");
const router = express.Router();

router
  .post("/", barberController.createBarber)
  .get("/", barberController.getBarbers)
  .get("/:id", barberController.getBarberById)
  .put("/:id", barberController.updateBarber)
  .delete("/:id", barberController.deleteBarber);

module.exports = router;
