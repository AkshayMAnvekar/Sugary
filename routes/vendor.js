const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Offer = require("../models/offer");

// Create a new vendor
router.post("/", async (req, res) => {
  try {
    const vendor = new User({
      name: req.body.name,
      image: req.body.logo,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await vendor.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create a new offer
router.post("/offer", async (req, res) => {
  try {
    const offer = new Offer({
      vendor: req.body.vendor,
      caption: req.body.caption,
      image: req.body.image,
      timings: req.body.timings,
      location: req.body.location,
      category: req.body.category,
    });
    const result = await offer.save();
    io.emit('offerCreated', offer);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
