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
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();
const Musisi = require("../database/model/musisi");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// Register Account
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/images/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error Deleting File" });
        }
      });
      return next(new ErrorHandler("User already exists"), 400);
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };
    const stripeCustomer = await stripe.customers.create({
      email: email,
      name: name,
    });

    user.stripeCustomerId = stripeCustomer.id;
    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
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
    <p>Hello, <strong>${user.name}</strong>,</p>
    <p class="activation-message">Thank you for registering at Sasando. To activate your account and dive into the world of indie music, please click the button below:</p>
    <a class="activation-button" href="${activationUrl}">Activate Account</a>
    <p class="appreciation-message">We appreciate your decision to join our community. Get ready to explore the diverse sounds of Indonesian indie musicians and beyond. Enjoy the melodies!</p>
</div>
</body>
</html>`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email :- ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Active user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, stripeCustomerId } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
        stripeCustomerId,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          new ErrorHandler("Please enter a valid email and password", 400)
        );
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Please enter the correct password", 400));
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load User information
router.get(
  "/getUser",
  isAuth,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Log out User
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out succesfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update user info
router.put(
  "/update-user-info",
  isAuth,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, name, phoneNumber, about } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password.toString());

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      user.email = email;
      user.name = name;
      user.phoneNumber = phoneNumber;
      user.about = about;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update Avatar for user
router.put(
  "/update-user-avatar",
  isAuth,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await User.findById(req.user.id);

      const existAvatarPath = `uploads/images/${existsUser.avatar}`;

      fs.unlinkSync(existAvatarPath);
      const fileUrl = path.join(req.file.filename);

      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update password for user
router.put(
  "/update-user-password",
  isAuth,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Password incorrect", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Find the user information using the provided id
router.get(
  "/user-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// LikedArtist
router.put(
  "/likedArtist/:id",
  [validateObjectId, isAuth],
  catchAsyncError(async (req, res, next) => {
    try {
      const { musisiId } = req.params.id;
      const { userId } = req.user;

      // Find user and Musisi
      const [user, musisi] = await Promise.all([
        User.findById(userId),
        Musisi.findById(musisiId),
      ]);

      if (!user || !musisi) {
        return next(new ErrorHandler("User or musisi not found", 404));
      }

      const likedIndex = user.likedArtists.indexOf(musisiId);

      if (likedIndex === -1) {
        // If not Liked add to likedArtist and increase the follower count for Musisi
        user.likedArtists.push(musisiId);
        musisi.follower += 1;
      } else {
        // If already liked , remove from likedArtists and decrease follower count
        user.likedArtists.splice(likedIndex, 1);
        musisi.follower -= 1;
      }

      await Promise.all([user.save(), musisi.save()]);

      res.status(200).json({
        message:
          likedIndex === -1
            ? "Musisi added to LikedArtist"
            : "Musisi Removed from likedArtist",
        user,
        musisi,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all users for the admin
router.get(
  "/admin-all-users",
  isAuth,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete user Admin
router.delete(
  "/delete-user/:id",
  isAuth,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler("User not found with id " + req.params.id, 400)
        );
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
