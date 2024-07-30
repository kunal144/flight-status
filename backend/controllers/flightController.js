const Flight = require("../models/flight");
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

//twilio setup
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = new twilio(accountSid, authToken);

// nodemailer setup

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_AUTH,
  },
});

exports.flights = async (req, res, next) => {
  try {
    const flight = await Flight.find();

    res.status(200).json({
      status: "success",
      message: "Get Flight Successfully",
      flight,
    });
  } catch (error) {
    next(error);
  }
};

exports.flightStatus = async (req, res, next) => {
  try {
    const flightNumber = req.params.flightNumber;
    const flight = await Flight.findOne({ flightNumber });

    res.status(200).json({
      message: "Success",
      flight,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateFlight = async (req, res, next) => {
  try {
    const { flight_id, status, departure_gate } = req.body;
    const flight = await Flight.findOneAndUpdate(
      { flight_id },
      { status, departure_gate },
      { new: true, runValidators: true }
    );

    const { passenger_details } = flight;

    console.log(flight);

    wss.broadcast(flight);

    if (status.toLocaleLowerCase() == "delayed") {
      //twilio sms to all passenger

      client.messages
        .create({
          body: `Flight '${flight_id}' is delayed and the gate changes to gate '${departure_gate}'.Sorry for the inconvenience`,
          to: passenger_details.phoneNumber,
          from: process.env.TWILIO_NUMBER,
        })
        .then((message) => console.log(`SMS sent: ${message.sid}`))
        .catch((error) => next(error));

      //email to all passenger
      // const mailOptions = {
      //   from: process.env.MY_EMAIL,
      //   to: "ykunal837@gmail.com",
      //   subject: "Flight Status:Delayed",
      //   text: `Flight '${flightNumber}' is delayed and the gate changes to gate '${departure_gate}'.Sorry for the inconvenience`,
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     return console.log(`Error sending email: ${error}`);
      //   }
      //   console.log(`Email send: ${info.response}`);
      // });
    }
    res.status(200).json({
      message: "success",
      flight,
    });
  } catch (error) {
    next(error);
  }
};
