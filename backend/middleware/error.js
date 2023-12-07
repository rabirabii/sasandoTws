const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //  MongoDb id Error
  if (err.name === "CastError") {
    const message = `Resources not found with this Id . . Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //  Jwt Error
  if ((err.name = "JsonWebTokenError")) {
    const message = `Your url is invalid please try again later`;
    err = new ErrorHandler(message, 400);
  }

  // Jwt Expired
  if (err.name === "TokenExpiredError") {
    const message = "Your url is expired , please try again later";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
