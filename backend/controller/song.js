const express = require("express");
const router = express.Router();
const Song = require("../database/model/song");
const Musisi = require("../database/model/musisi");
const { upload } = require("../multer");
const Genre = require("../database/model/genre");
const { isMusisi, isAuth, isAdmin } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const validateObjectId = require("../middleware/validateObjectId");
const User = require("../database/model/user");
const fs = require("fs");
// Create a song
router.post(
  "/create-song",
  upload.fields([{ name: "song" }, { name: "img" }]),
  catchAsyncError(async (req, res, next) => {
    try {
      const artistId = req.body.artistId;
      const artist = await Musisi.findById(artistId);
      if (!artist) {
        return next(new ErrorHandler("Artist not found", 400));
      } else {
        const imgUrl = req.files.img[0].filename;
        const songUrl = req.files.song[0].filename;

        // Create a song
        const songData = req.body;
        songData.img = imgUrl;
        songData.song = songUrl;
        songData.artist = artist;

        const song = await Song.create(songData);

        await song.save();
        res.status(201).json({
          success: true,
          song,
        });
      }

      // Save the song to the database
      await newSong.save();

      // Respond with a success message
      res.status(201).json({
        message: "Song created successfully and pending admin approval",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Admin approval route
router.put(
  "/approve-song/:songId",
  isAuth,
  isAdmin("Admin"),
  async (req, res) => {
    try {
      // Find the song by its ID
      const song = await Song.findById(req.params.songId);

      if (!song) {
        return res.status(404).json({ error: "Song not found" });
      }

      // Update the song's status based on the admin's decision
      const decision = req.body.decision; // Decision could be "accept" or "reject"

      if (decision === "accept") {
        song.status = "accepted";
      } else if (decision === "reject") {
        song.status = "rejected";
      } else {
        return res.status(400).json({ error: "Invalid decision" });
      }

      await song.save();

      // Respond with a success message
      res.json({ message: `Song ${decision}ed successfully` });
    } catch (error) {
      // Handle any errors during the approval process
      console.error("Error processing admin decision:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the decision" });
    }
  }
);

// Get all Songs
router.get(
  "/get-all-songs",
  catchAsyncError(async (req, res, next) => {
    try {
      const songs = await Song.find({});

      res.status(200).json({
        success: true,
        songs,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);
// Get single Song
router.get(
  "/get-song-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const song = await Song.findById(req.params.id);
      res.status(201).json({
        success: true,
        song,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// Get all Song of a Artist
router.get(
  "/get-all-songs/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const songs = await Song.find({ artistId: req.params.id });

      if (!songs || songs.length === 0) {
        return next(
          new ErrorHandler(
            "No songs found for the artist with ID " + req.params.id,
            404
          )
        );
      }

      res.status(200).json({
        success: true,
        songs,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// Like Song
router.put(
  "/like/:id",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    try {
      let resMessage = "";
      const songId = req.params.id;
      const song = await Song.findById(songId);
      if (!song) {
        return next(
          new ErrorHandler("Song not found with this id " + songId, 404)
        );
      }

      const user = await User.findById(req.user.id);
      const index = user.likedSongs.indexOf(song._id);
      if (index === -1) {
        user.likedSongs.push(song._id);
        resMessage = "Added to your liked songs";
      } else {
        user.likedSongs.splice(index, 1); // Use splice to remove the item
        resMessage = "Removed from your liked songs";
      }

      await user.save();
      res.status(200).json({
        message: resMessage,
        success: true,
      });
    } catch (error) {
      // Handle specific error cases or provide custom error messages
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get Liked songs
router.get(
  "/likedSongs",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Fetch songs based on the likedSongs IDs
      const likedSongIds = user.likedSongs; // Assuming these are song IDs
      const songs = await Song.find({ _id: { $in: likedSongIds } });

      res.status(200).json({
        success: true,
        songs,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// Update song
router.put(
  "/update-song/:id",
  isMusisi,
  catchAsyncError(async (req, res, next) => {
    try {
      const songId = req.params.id;
      const song = await Song.findById(songId);
      if (!song) {
        return next(new ErrorHandler("Song not found with this id" + songId));
      }

      // Update Song field
      song.name = req.body.name;
      song.genre = req.body.genre;
      song.duration = req.body.duration;
      song.updatedAt = Date.now();
      song.description = req.body.description;
      // Save the Updated song
      const updatedSong = await song.save();

      res.status(200).json({
        success: true,
        song: updatedSong,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Update Song and Img field of the song
router.put(
  "/update-song-field/:id",
  isMusisi,
  upload.fields([{ name: "song" }, { name: "img" }]),
  catchAsyncError(async (req, res, next) => {
    try {
      const songId = req.params.id;
      const existSong = await Song.findById(songId);
      const existImgPath = `uploads/images/${existSong.img}`;
      const existSongPath = `uploads/audio/${existSong.song}`;
      fs.unlinkSync(existImgPath);
      fs.unlinkSync(existSongPath);

      const newImgPath = `uploads/images/${req.files.img[0].filename}`;
      const newSongPath = `uploads/audio/${req.files.song[0].filename}`;

      const songg = await Song.findByIdAndUpdate(songId, {
        img: newImgPath,
        song: newSongPath,
      });
      res.status(200).json({
        success: true,
        songg,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Endpoint for playing a song
router.post(
  "/play/:songId",
  catchAsyncError(async (req, res, next) => {
    const { songId } = req.params;

    try {
      // Find the song by ID and update totalListener
      const song = await Song.findById(songId);
      if (!song) {
        return res.status(404).json({ error: "Song not found" });
      }

      song.totalListener += 1;
      song.updatedListener = new Date();
      await song.save();

      // Find the associated musisi and update totalListeners
      const musisi = await Musisi.findById(song.artistId);
      if (musisi) {
        musisi.totalListeners += 1;
        await musisi.save();
      }

      return res.status(200).json({
        success: true,
        songListeners: song.totalListener,
        updatedListener: song.updatedListener,
        musisiListeners: musisi ? musisi.totalListeners : 0,
      });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete Song
router.delete(
  "/delete-song/:id",
  isMusisi,
  catchAsyncError(async (req, res, next) => {
    try {
      const songId = req.params.id;
      const songData = await Song.findById(songId);

      if (!songData) {
        return next(new ErrorHandler("Song not found with id " + songId, 404));
      }

      // Check if img is an array before using forEach
      if (Array.isArray(songData.img)) {
        songData.img.forEach((imgUrl) => {
          const filename = imgUrl;
          const filePath = `uploads/images/${filename}`;
          fs.unlinkSync(filePath); // Delete image file
        });
      }

      // Check if song is an array before using forEach
      if (Array.isArray(songData.song)) {
        songData.song.forEach((songUrl) => {
          const filename = songUrl;
          const filePath = `uploads/audio/${filename}`;
          fs.unlinkSync(filePath); // Delete song file
        });
      }

      // Delete the song from the database
      await Song.findByIdAndDelete(songId);

      res.status(201).json({
        success: true,
        message: "Song deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
