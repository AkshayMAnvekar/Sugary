const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Offer = require("../models/offer");

// Create a new user
router.post("/", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
