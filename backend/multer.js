const multer = require("multer");
const path = require("path");

// Define a storage configuration for handling images and audio
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith("image/") || file.mimetype === "image/gif") {
      cb(null, path.join(__dirname, "./uploads/images"));
    } else if (file.mimetype.startsWith("audio/")) {
      cb(null, path.join(__dirname, "./uploads/audio"));
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    const extension = path.extname(file.originalname);
    cb(null, filename + "-" + uniqueSuffix + extension);
  },
});

// Define a file filter to allow only image and audio file types
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "image/gif" ||
    file.mimetype.startsWith("audio/")
  ) {
    cb(null, true); // Accept image, audio, and GIF files
  } else {
    cb(new Error("Only image, audio, and GIF files are allowed!"), false);
  }
};

exports.upload = multer({ storage: storage, fileFilter: fileFilter });
