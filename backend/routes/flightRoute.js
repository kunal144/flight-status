const express = require("express");
const flightController = require("../controllers/flightController");
const router = express.Router();

router.get("/flights", flightController.flights);
router.get("/flights/:id", flightController.flightStatus);
router.post("/update-flight-status", flightController.updateFlight);

module.exports = router;
