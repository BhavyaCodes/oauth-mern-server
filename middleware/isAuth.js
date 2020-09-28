const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const isAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, keys.jwtSecret);
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req._id = decodedToken._id;
};

module.exports = isAuth;
