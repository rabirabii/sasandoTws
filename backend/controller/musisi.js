const express = require("express");
const path = require("path");
const User = require("../database/model/user");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuth, isAdmin, isMusisi } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Musisi = require("../database/model/musisi");
const sendMusisiToken = require("../utils/artistToken");
// Create Artist
router.post("/create-artist", upload.single("file"), async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const musisiEmail = await Musisi.findOne({ email });

    if (musisiEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/images/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const musisi = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(musisi);

    const activationUrl = `http://localhost:3000/artist/activation/${activationToken}`;

    try {
      await sendMail({
        email: musisi.email,
        subject: "Activation your account",
        html: `
            <html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            animation: fade-in 1s ease-in-out;
        }
        @keyframes fade-in {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
        .activation-heading {
            color: #6b21a8;
            margin-top: 0;
            animation: slide-up 0.5s ease-in-out;
        }
        @keyframes slide-up {
            0% {
                transform: translateY(20px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
        .activation-button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #f8fafc;
            color: #0f172a;
            text-decoration: none;
            border-radius: 5px;
            border: 2px solid #6b21a8;
        }
        .activation-button:hover {
            background-color: #6b21a8;
            color: #f8fafc
        }
        .activation-message {
            margin-top: 20px;
            color: #333333;
            animation: slide-up 0.5s ease-in-out;
        }
        .appreciation-message {
            margin-top: 20px;
            color: #666666;
            animation: slide-up 0.5s ease-in-out;
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: bold;
            color: #6b21a8;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="logo">Sasando: The Sound of Indonesian Music Art 🎶</div>
    <h3 class="activation-heading">Activate Your Account</h3>
    <p>Hello, <strong>${musisi.name}</strong>,</p>
    <p class="activation-message">Thank you for registering at Sasando. To activate your account and dive into the world of indie music, please click the button below:</p>
    <a class="activation-button" href="${activationUrl}">Activate Account</a>
    <p class="appreciation-message">We appreciate your decision to join our community. Get ready to explore the diverse sounds of Indonesian indie musicians and beyond. Enjoy the melodies!</p>
</div>
</body>
</html>`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email :- ${musisi.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Create activation token for musisi
const createActivationToken = (musisi) => {
  return jwt.sign(musisi, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Active Musisi Account
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newMusisi = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newMusisi) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newMusisi;

      let musisi = await Musisi.findOne({ email });

      if (musisi) {
        return next(new ErrorHandler("musisi already exists", 400));
      }
      musisi = await Musisi.create({
        name,
        email,
        avatar,
        password,
      });

      sendMusisiToken(musisi, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Login Musisi
router.post(
  "/login-artist",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          new ErrorHandler("Please enter a valid email and password", 400)
        );
      }

      const user = await Musisi.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User does not exist", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Please provide a valid password", 400));
      }

      sendMusisiToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load Musisi
router.get(
  "/getMusisi",
  isMusisi,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const musisi = await Musisi.findById(req.musisi.id);

      if (!musisi) {
        return next(new ErrorHandler("User does not exist", 400));
      }

      res.status(200).json({
        success: true,
        musisi,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Log out for Doctor
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("musisi_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: " Log out successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get Artist info
router.get(
  "/get-artist-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const musisi = await Musisi.findById(req.params.id);
      res.status(201).json({
        success: true,
        musisi,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update musisi profile Picture
router.put(
  "/update-musisi-profile",
  isMusisi,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await Musisi.findById(req.musisi._id);

      if (existsUser.avatar) {
        const existsAvatarPath = `uploads/images/${existsUser.avatar}`;

        // Check if the file exists before attempting to delete it
        if (fs.existsSync(existsAvatarPath)) {
          fs.unlinkSync(existsAvatarPath);
        } else {
          console.log("File not found:", existsAvatarPath);
        }
      }

      const fileUrl = path.join(req.file.filename);

      const musisi = await Musisi.findByIdAndUpdate(req.musisi._id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        musisi,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update musisi background Picture
router.put(
  "/update-musisi-background",
  isMusisi,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await Musisi.findById(req.musisi._id);

      if (existsUser.backgroundImg) {
        const existsBackgroundImagePath = `uploads/images/${existsUser.backgroundImg}`;
        fs.unlinkSync(existsBackgroundImagePath);
      }

      const fileUrl = path.join(req.file.filename);

      const musisi = await Musisi.findByIdAndUpdate(req.musisi._id, {
        backgroundImg: fileUrl,
      });

      res.status(200).json({
        success: true,
        musisi,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update musisi info
router.put(
  "/update-user-info",
  isMusisi,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("Request body:", req.body);

      const { about, asal, twitter, website, instagram, personalWebsite } =
        req.body;

      const musisi = await Musisi.findOne(req.musisi._id);

      console.log("Found musisi:", musisi);

      if (!musisi) {
        return next(new ErrorHandler("musisi not found", 400));
      }

      musisi.about = about;
      musisi.asal = asal;
      musisi.twitter = twitter;
      musisi.instagram = instagram;
      musisi.website = website;
      musisi.personalWebsite = personalWebsite;

      await musisi.save();

      res.status(201).json({
        success: true,
        musisi,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Like Artist
router.put(
  "/like/:id",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    try {
      let resMessage = "";
      const artistId = req.params.id;
      const artist = await Musisi.findById(artistId);
      if (!artist) {
        return next(
          new ErrorHandler("Artist not Found with this ID" + artistId, 404)
        );
      }

      const user = await User.findById(req.user.id);
      const index = user.likedArtists.indexOf(artist._id);
      if (index === -1) {
        user.likedArtists.push(artist._id);
        artist.follower += 1;
        resMessage = "Added to your Liked Artist";
      } else {
        user.likedArtists.splice(index, 1);
        artist.follower -= 1;
        resMessage = "Removed from your liked Artist";
      }

      await user.save();
      await artist.save();
      res.status(201).json({
        message: resMessage,
        success: true,
        user: user.likedArtists,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all Artist for Admin
router.get(
  "/admin-all-musisis",
  isAuth,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const musisis = await Musisi.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        musisis,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete Artist for Admin
router.delete(
  "/delete-musisi/:id",
  isAuth,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const musisi = await Musisi.findById(req.params.id);

      if (!musisi) {
        return next(new ErrorHandler("musisi not found", 400));
      }

      await Musisi.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Musisi successfully deleted",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all Musisi
router.get(
  "/get-all-musisi",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const artists = await Musisi.find({});

      res.status(201).json({
        success: true,
        artists,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);
// Get all Musisi for Admin
router.get(
  "/admin-all-musisi",
  isAuth,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const artists = await Musisi.find({});

      res.status(201).json({
        success: true,
        artists,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);
module.exports = router;
