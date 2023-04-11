const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const socketIO = require("socket.io");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const Offer = require("./models/offer");
const User = require("./models/user");

// Set up server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

dotenv.config();

const vendorRoutes = require("./routes/vendor");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

// Connect to MongoDB
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

// Enable CORS
app.use(cors());

// Parse request body as JSON
app.use(bodyParser.json());

// Routes
app.use("/api/vendor", vendorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

io.on("connection", (socket) => {

  socket.on("offerCreated", (offer) => {
    socket.broadcast.emit("newOffer", offer);
  });

  socket.on("getOffers", (location) => {
    const currentTime = new Date();
    const offers = Offer.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [location.longitude, location.latitude], //In float
          },
          $minDistance: 0,
          $maxDistance: 2000, //In meters
        },
      },
    })
      .where("verified")
      .equals(true)
      .where("expiryTime")
      .gte(currentTime);

    socket.emit("offers", JSON.stringify(offers));
  });

  socket.on("offerAddedToAccount", (data) => {
    // Set timeout for when offer expires
    const expiryTime = new Date(offer.expiryTime);
    const currentTime = new Date();
    const timeDifference = expiryTime - currentTime;
    User.findOne({ _id: data.userId }, (err, user) => {
      if (user) {
        user.offers.push(data.offerId);
        user.save();
      }
    });

    setTimeout(() => {
      socket.emit("offerExpired", offer);
    }, timeDifference);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log(`Server started on port ${port}`));
