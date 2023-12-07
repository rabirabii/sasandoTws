const express = require("express");
const path = require("path");
const User = require("../database/model/user");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuth, isAdmin } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Genre = require("../database/model/genre");
// Create a Genre
router.post(
  "/create-genre",
  isAuth,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isGenreExists = await Genre.find({
        name: req.body.name,
      });

      if (isGenreExists.length !== 0) {
        return next(new ErrorHandler("Genre already exists", 400));
      }

      const genre = await Genre.create(req.body);

      res.status(201).json({
        success: true,
        genre,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all genres
router.get(
  "/get-genres",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const genres = await Genre.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        genres,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Update the genres
router.put(
  "/update-genres/:id",
  isAuth,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const genreId = req.params.id;
      const genre = await Genre.findById(genreId);
      if (!genre) {
        return next(new ErrorHandler("Genre not found", 400));
      }

      genre.name = req.body.name;

      const updatedGenre = await genre.save();

      res.status(200).json({
        success: true,
        updatedGenre,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// Delete Genre
router.delete(
  "/delete-genre/:id",
  isAuth,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const genre = await Genre.findByIdAndDelete(req.params.id);

      if (!genre) {
        return next(new ErrorHandler("Genre does not exist", 400));
      }
      res.status(201).json({
        success: true,
        message: "Genre has been deleted succesfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);
module.exports = router;
