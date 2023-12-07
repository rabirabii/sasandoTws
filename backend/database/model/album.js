const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  songs: {
    type: Array,
    default: [],
  },
  desc: {
    type: String,
  },
  label: {
    type: String,
    required: true,
  },
  musisiId: {
    type: String,
    required: true,
  },
  musisi: {
    type: Object,
    ref: "Musisi",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Album", albumSchema);
