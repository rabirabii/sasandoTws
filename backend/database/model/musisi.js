const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const musisiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Musisi",
  },
  backgroundImg: {
    type: String,
  },
  avatar: {
    type: String,
    required: true,
  },
  asal: { type: String },
  twitter: { type: String },
  website: { type: String },
  instagram: { type: String },
  personalWebsite: { type: String },
  albums: {
    type: [String], // defining an array of strings
    default: [], // default value is an empty array
  },
  totalListeners: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  follower: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedListener: {
    type: Date,
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password
musisiSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
musisiSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
musisiSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Musisi", musisiSchema);
