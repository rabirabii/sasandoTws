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
const Playlist = require("../database/model/playlist");
const fs = require("fs");
const path = require("path");
// Create Playlist
router.post(
  "/create-playlist",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    try {
      const ownerId = req.body.ownerId;
      const user = await User.findById(ownerId);
      if (!user) {
        return next(
          new ErrorHandler("User not found for the provided ownerId")
        );
      }

      const playlistData = {
        name: req.body.name,
        thumbnail: req.body.thumbnail,
        desc: req.body.desc,
        gambar: req.body.gambar, // Add gambar field if available in the request body
        ownerId: req.body.ownerId,
        owner: user, // Assign the user object as the owner
        // ... other fields
      };

      const playlist = await Playlist.create(playlistData);

      user.playlists.push(playlist._id);
      await user.save();

      res.status(201).send({ data: playlist });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Edit playlist by Id
router.put(
  "/edit-playlist/:id",
  [validateObjectId, isAuth],
  upload.single("image"), // Use upload.single for a single image
  catchAsyncError(async (req, res, next) => {
    try {
      const playlistId = req.params.id;
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return next(new ErrorHandler("Playlist not found", 404));
      }

      const existThumbnailPath = `uploads/images/${playlist.thumbnail}`;
      if (playlist.thumbnail && fs.existsSync(existThumbnailPath)) {
        fs.unlinkSync(existThumbnailPath); // Remove the existing thumbnail
      }
      const fileUrl = path.join(req.file.filename);
      const ownerId = await User.findById(req.user._id);
      if (!ownerId.equals(playlist.owner)) {
        return next(new ErrorHandler("User doesn't have access", 403));
      }

      playlist.name = req.body.name;
      playlist.desc = req.body.desc;
      playlist.thumbnail = fileUrl;

      await playlist.save();
      res.status(200).json({
        success: true,
        playlist,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// Update Avatar for playlist
router.put(
  "/update-background/:id",
  isAuth,
  upload.single("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      const existPlaylist = await Playlist.findById(req.params.id);

      if (!existPlaylist) {
        return next(new ErrorHandler("Playlist not found", 404));
      }

      const existAvatarPath = `uploads/images/${existPlaylist.gambar}`;

      if (existPlaylist.gambar && fs.existsSync(existAvatarPath)) {
        fs.unlinkSync(existAvatarPath);
      }

      const fileUrl = path.join(req.file.filename);

      // Update the field name according to your Playlist schema
      const playlist = await Playlist.findByIdAndUpdate(req.params.id, {
        gambar: fileUrl,
      });

      res.status(200).json({
        success: true,
        playlist,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Add song to the playlist
router.put(
  "/add-song",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      const playlist = await Playlist.findById(req.body.playlistId);

      if (!user || !playlist) {
        return res.status(404).json({ message: "User or playlist not found." });
      }

      if (!user._id.equals(playlist.owner)) {
        return res
          .status(403)
          .json({ message: "User doesn't have access to add." });
      }

      const songExists = playlist.songs.indexOf(req.body.songId) !== -1;
      if (!songExists) {
        playlist.songs.push(req.body.songId);
        await playlist.save();
      }

      res.status(200).json({
        success: true,
        playlist,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Remove Song from the playlist
router.put(
  "/remove-song",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      const playlist = await Playlist.findById(req.body.playlistId);

      if (!user || !playlist) {
        return res.status(404).json({ message: "User or playlist not found." });
      }

      const index = playlist.songs.indexOf(req.body.songId);
      playlist.songs.splice(index, 1);
      await playlist.save();
      res.status(200).json({
        success: true,
        playlist,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// User Playlists
router.get(
  "/favourite",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      const playlist = await Playlist.find({ _id: user.playlists });
      res.status(200).json({
        success: true,
        playlist,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get Random Playlist
router.get(
  "/random",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    try {
      const playlist = await Playlist.aggregate([{ $sample: { size: 10 } }]);
      res.status(200).json({
        success: true,
        playlist,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all playlist of a User
router.get(
  "/get-all-playlist/:id",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    try {
      const playlists = await Playlist.find({ ownerId: req.params.id });

      if (!playlists || playlists.length === 0) {
        return next(
          new ErrorHandler(
            "No playlist found for the user with ID" + req.params.id,
            404
          )
        );
      }
      res.status(200).json({
        success: true,
        playlists,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// Get playlist by id
router.get(
  "/playlist/:id",
  [validateObjectId, isAuth],
  catchAsyncError(async (req, res, next) => {
    try {
      const playlist = await Playlist.findById(req.params.id)
        .populate("owner")
        .select("name thumbnail desc ownerId songs owner");
      if (!playlist) {
        return next(new ErrorHandler("Playlist not found", 404));
      }
      const songs = await Song.find({ _id: { $in: playlist.songs } });

      res.status(200).json({
        success: true,
        playlist,
        songs,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all playlists
router.get(
  "/",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    try {
      const playlists = await Playlist.find();
      res.status(200).json({
        success: true,
        playlists,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete Playlist by Id
router.delete(
  "/delete-playlist/:id",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    const playlistId = req.params.id;
    const userId = req.user._id; // Assuming you have authentication middleware and req.user contains user information

    try {
      // Find the playlist by ID and populate the owner field with the actual user object
      const playlist = await Playlist.findById(playlistId)
        .populate("owner")
        .select("owner");

      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }

      // Check if the user owns the playlist before deletion
      console.log("Playlist owner ID:", playlist?.owner?._id);
      console.log("User ID:", userId);

      // Ensure both IDs are strings and then compare
      if (String(playlist?.owner?._id) !== String(userId)) {
        return res.status(403).json({
          message: "You do not have permission to delete this playlist",
        });
      }

      // Remove playlist from the user's playlists array
      const user = await User.findById(userId);
      const index = user.playlists.indexOf(playlistId);
      if (index !== -1) {
        user.playlists.splice(index, 1);
      }

      // Update the user's playlists array and delete the playlist
      await Promise.all([playlist.deleteOne(), user.save()]);

      return res.json({ message: "Playlist deleted successfully!" });
    } catch (error) {
      console.error("Error deleting playlist:", error.message);
      return res.status(500).json({ message: "Server Error" });
    }
  })
);

module.exports = router;
