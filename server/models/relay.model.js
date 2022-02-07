const mongoose = require("mongoose");

const RelaySchema = new mongoose.Schema({
  place: {
    type: String,
    required: [true, "Please add a roomEn"],
    lowercase: true,
  },
  operation: {
    type: String,
    required: [true, "Please add an operationEn"],
    lowercase: true,
  },
  pin: {
    type: Number,
    required: [true, "Please add the number of connected pin"],
    unique: true,
  },
  state: {
    type: Boolean,
  },
});
module.exports = mongoose.model("Relay", RelaySchema);
