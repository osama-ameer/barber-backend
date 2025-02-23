const express = require("express");
const reservationController = require("../controllers/reservationController");
const router = express.Router();

router
  .post("/", reservationController.createReservation)
  .get("/", reservationController.getReservations)
  .get("/:id", reservationController.getReservationById)
  .put("/:id", reservationController.updateReservation)
  .delete("/:id", reservationController.deleteReservation);

module.exports = router;
