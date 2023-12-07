const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  artistId: {
    type: String,
    required: true,
  },
  artist: {
    type: Object,
    required: true,
  },
  song: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["accepted", "rejected", "pending"],
    default: "pending",
  },
  lyrics: {
    type: String,
  },
  genre: {
    type: String,
    ref: "Genre",
    required: true,
  },
  exclusive: {
    type: String,
  },
  totalListener: {
    type: Number,
    default: 0,
  },
  Label: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedListener: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Song", songSchema);
