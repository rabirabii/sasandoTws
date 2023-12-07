const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "./uploads")));
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads/images"))
);
app.use(
  "/uploads/audio",
  express.static(path.join(__dirname, "uploads/audio"))
);
app.use("/test", (req, res) => {
  res.send("Hello World!");
});
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}
// import the routes

const user = require("./controller/user");
const artist = require("./controller/musisi");
const stripeController = require("./controller/stripeController");
const genre = require("./controller/genre");
const song = require("./controller/song");
const playlist = require("./controller/playlist");
const search = require("./controller/search");
const album = require("./controller/album");
app.use("/api/sasando/user", user, (req, res) => {
  res.send("Welcome!");
});
app.use("/api/sasando/artist", artist, (req, res) => {
  res.send("Welcome! to the Artist");
});
app.use("/api/sasando/stripe-route", stripeController);
app.use("/api/sasando/genre", genre);
app.use("/api/sasando/song", song);
app.use("/api/sasando/playlist", playlist);
app.use("/api/sasando/search", search);
app.use("/api/sasando/album", album);
module.exports = app;
