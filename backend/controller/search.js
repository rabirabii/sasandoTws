const router = require("express").Router();
const Song = require("../database/model/song");
const Playlist = require("../database/model/playlist");
const { isAuth } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");

router.get(
  "/",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    const search = req.query.search;
    if (search !== "") {
      const songs = await Song.find({
        name: { $regex: search, $options: "i" },
      }).limit(10);
      const playlist = await Playlist.find({
        name: { $regex: search, $options: "i" },
      }).limit(10);
      const result = { songs, playlist };
      res.status(201).json({
        success: true,
        result,
      });
    }
  })
);

module.exports = router;
