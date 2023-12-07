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
const Album = require("../database/model/album");
const fs = require("fs");

// Create a new album
router.post(
  "/create-album",
  upload.single("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      const musisiId = req.body.musisiId;

      // Find Musisi by id
      const musisi = await Musisi.findById(musisiId);

      if (!musisi) {
        return next(new ErrorHandler("Musisi not found"));
      }

      const imgUrl = req.file.filename;

      const album = {
        name: req.body.name,
        thumbnail: imgUrl,
        musisiId: req.body.musisiId,
        musisi: musisi,
        desc: req.body.desc,
        label: req.body.label,
      };

      // Save the album
      const newAlbum = await Album.create(album);

      musisi.albums.push(newAlbum._id);
      await musisi.save();

      res.status(201).json({
        success: true,
        data: newAlbum,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Create an Song for certain Album
router.post(
  "/:albumId/create-song",
  upload.fields([{ name: "song" }, { name: "img" }]),
  catchAsyncError(async (req, res, next) => {
    try {
      const { albumId } = req.params;
      const album = await Album.findById(albumId);
      if (!album) {
        return next(new ErrorHandler("Album not found", 404));
      }
      const artistId = req.body.artistId;
      const artist = await Musisi.findById(artistId);
      if (!artist) {
        return next(new ErrorHandler("Artist not found", 404));
      }
      const imgUrl = req.files.img[0].filename;
      const songUrl = req.files.song[0].filename;

      const songData = req.body;
      songData.img = imgUrl;
      songData.artist = artist;
      songData.exclusive = album;
      songData.song = songUrl;

      const song = await Song.create(songData);

      await song.save();

      //   Add the new sogns ID to albums songs array
      album.songs.push(song._id);
      await album.save();

      //   If succesful then send this response
      res.status(201).json({
        message: "Song Created Successfully",
        song: song,
        album: album.songs,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Add song for album
router.put(
  "/add-song",
  isMusisi,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await Musisi.findById(req.musisi._id);
      const album = await Album.findById(req.body.albumId);

      if (!user || !album) {
        return res.status(404).json({ message: "User or playlist not found." });
      }

      if (!user._id.equals(album.musisi)) {
        return res
          .status(403)
          .json({ message: "User doesn't have access to add." });
      }

      const songExists = album.songs.indexOf(req.body.songId) !== -1;
      if (!songExists) {
        album.songs.push(req.body.songId);
        await album.save();
      }

      res.status(200).json({
        success: true,
        album,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Remove song from the album
router.put(
  "/remove-song",
  isMusisi,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await Musisi.findById(req.musisi._id);
      const album = await Album.findById(req.body.albumId);

      if (!user || !Album) {
        return res.status(404).json({ message: "User or Album not found." });
      }

      const index = album.songs.indexOf(req.body.songId);
      album.songs.splice(index, 1);
      await album.save();
      res.status(200).json({
        success: true,
        album,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// Get all Playlists of Musisi
router.get(
  "/yourAlbum",
  isMusisi,
  catchAsyncError(async (req, res, next) => {
    try {
      const musisiId = req.musisi._id;

      // Fetch the musisi with populated albums
      const musisi = await Musisi.findById(musisiId);

      if (!musisi) {
        return next(new ErrorHandler("Musisi not found", 404));
      }

      // Extract albums from the musisi object
      const albums = await Album.find({ _id: musisi.albums });

      res.status(200).json({
        success: true,
        albums,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all album of a specific artist
router.get(
  "/get-all-albums/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const albums = await Album.find({ musisiId: req.params.id });

      if (!albums || albums.length === 0) {
        return next(
          new ErrorHandler(
            "No Album found for the Artist with Id" + req.params.id
          )
        );
      }

      res.status(201).json({
        success: true,
        albums,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get All Albums
router.get(
  "/",
  catchAsyncError(async (req, res, next) => {
    try {
      const albums = await Album.find();
      res.status(200).json({
        success: true,
        albums,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// Edit album by Id
router.put(
  "/editAlbum/:id",
  [validateObjectId, isMusisi],
  upload.single("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      const albumId = req.params.id;
      const album = await Album.findById(albumId);
      if (!album) {
        return next(new ErrorHandler("Album not found", 404));
      }

      const existThumbnailPath = `uploads/images/${album.thumbnail}`;
      if (album.thumbnail && fs.existsSync(existThumbnailPath)) {
        fs.unlinkSync(existThumbnailPath); // Remove the existing thumbnail
      }
      const fileUrl = path.join(req.file.filename);
      const musisiId = await Musisi.findById(req.musisi._id);
      if (!musisiId.equals(album.musisi)) {
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

// Get Album by Id
router.get(
  "/album/:id",
  [validateObjectId, isMusisi, isAuth],
  catchAsyncError(async (req, res, next) => {
    try {
      const album = await Album.findById(req.params.id)
        .populate("musisi")
        .select("name thumbnail desc musisiId songs musisi");
      if (!album) {
        return next(new ErrorHandler("album not found", 404));
      }
      const songs = await Song.find({ _id: { $in: album.songs } });

      res.status(200).json({
        success: true,
        album,
        songs,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete Album by Id
router.delete(
  "/delete-album/:id",
  isMusisi,
  catchAsyncError(async (req, res, next) => {
    const albumId = req.params.id;
    const userId = req.musisi._id; // Assuming you have authentication middleware and req.user contains user information

    try {
      // Find the playlist by ID and populate the owner field with the actual user object
      const album = await Album.findById(albumId)
        .populate("musisi")
        .select("musisi");

      if (!album) {
        return res.status(404).json({ message: "Album not found" });
      }

      // Check if the user owns the playlist before deletion
      console.log("Album owner ID:", album?.musisi?._id);
      console.log(" ID Musisi:", userId);

      // Ensure both IDs are strings and then compare
      if (String(album?.musisi?._id) !== String(userId)) {
        return res.status(403).json({
          message: "You do not have permission to delete this Album",
        });
      }

      // Remove playlist from the user's playlists array
      const user = await Musisi.findById(userId);
      const index = user.albums.indexOf(albumId);
      if (index !== -1) {
        user.albums.splice(index, 1);
      }

      // Update the user's playlists array and delete the playlist
      await Promise.all([album.deleteOne(), user.save()]);

      return res.json({ message: "Album deleted successfully!" });
    } catch (error) {
      console.error("Error deleting playlist:", error.message);
      return res.status(500).json({ message: "Server Error" });
    }
  })
);
module.exports = router;
