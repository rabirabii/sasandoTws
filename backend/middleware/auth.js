const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../database/model/user");
const Musisi = require("../database/model/musisi");
const catchAsyncError = require("./catchAsyncError");

exports.isAuth = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log("Authentication User successful.");
  console.log(decoded.id);
  req.user = await User.findById(decoded.id);

  next();
});

exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role} can not access`));
    }
    next();
  };
};

// isMusisi middleware
exports.isMusisi = catchAsyncError(async (req, res, next) => {
  const { musisi_token } = req.cookies;
  if (!musisi_token) {
    console.log("Token is missing in the request.");
    return next(new ErrorHandler("Please Login to continue", 401));
  }

  try {
    const decoded = jwt.verify(musisi_token, process.env.JWT_SECRET_KEY);
    req.musisi = await Musisi.findById(decoded.id);
    console.log("Authentication Artist successful.");
    console.log(decoded.id);
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return next(new ErrorHandler("Authentication failed", 401));
  }
});
