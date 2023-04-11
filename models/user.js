const mongoose = require("mongoose");
const Offer = require("./offer")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
  offers: [{type: mongoose.Types.ObjectId, ref: "Offer"}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
