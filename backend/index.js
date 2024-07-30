const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const flightRoute = require("./routes/flightRoute");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const WebSocket = require("ws");

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

// mongobDb connection with main database
mongoose
  .connect(String(process.env.MONGODB_URI))
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("failed to connect", err));

// websocket server connection
const server = app.listen(3000, () => {
  console.log(`Server listening on 3000`);
});
wss = new WebSocket.Server({ server });

//middleware setup
app.use(bodyParser.json());

//Broadcast function to send data to all users

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// get all the flight details
app.use("/api/", flightRoute);

//handle flight delay
app.use("/api/", flightRoute);
