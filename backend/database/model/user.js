const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
  },
  about: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    type: String,
  },
  subscribe: {
    type: String,
  },
  likedArtists: {
    type: [String],
    default: [],
  },
  likedSongs: {
    type: [String],
    default: [],
  },
  playlists: {
    type: [String],
    default: [],
  },
  expiresAt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  },
  createdAt: {
    type: Date,
  },

  resetPasswordToken: String,
  resetPasswordTime: Date,
  stripeCustomerId: { type: String },
});

// Hash Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Jwt Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
