const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  category: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

offerSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Offer", offerSchema);
