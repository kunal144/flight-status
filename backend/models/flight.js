const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flight_id: {
    type: String,
    required: true,
  },
  airline: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  departure_gate: {
    type: String,
    required: true,
  },
  arrival_gate: {
    type: String,
    required: true,
  },
  scheduled_departure: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  scheduled_arrival: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  actual_departure: {
    type: mongoose.Schema.Types.Date,
  },
  actual_arrival: {
    type: mongoose.Schema.Types.Date,
  },
  passenger_details: {
    type: {
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
});

const flight = mongoose.model("flight", flightSchema);
module.exports = flight;
