const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  gambar: {
    type: String,
  },
  desc: {
    type: String,
  },
  songs: {
    type: Array,
    default: [],
  },
  ownerId: {
    type: String,
    required: true,
  },
  owner: {
    type: Object,
    ref: "User",
    required: true,
  },
  collaborators: {
    type: Object,
    ref: "User",
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

module.exports = mongoose.model("Playlist", playlistSchema);
