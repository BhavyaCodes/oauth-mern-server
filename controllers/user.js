const User = require("../models/user");

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate("posts");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};
