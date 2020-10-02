const axios = require("axios").default;
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const User = require("../models/user");

exports.getGoogleAuth = async (req, res, next) => {
  res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${process.env.CLIENT_URL}/auth/google/callback&prompt=consent&response_type=code&client_id=${keys.googleClientID}&scope=email%20openid%20profile&access_type=offline`
  );
};

exports.getGoogleAuthCallback = async (req, res, next) => {
  const code = req.query.code;
  const data = await axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: keys.googleClientID,
    client_secret: keys.googleClientSecret,
    redirect_uri: `${process.env.CLIENT_URL}/auth/google/callback`,
    grant_type: "authorization_code",
  });
  const decoded = jwt.decode(data.data.id_token, { complete: true });

  const existingUser = await User.findOne({ googleId: decoded.payload.sub });

  if (existingUser) {
    const token = jwt.sign(
      {
        _id: existingUser._id,
      },
      keys.jwtSecret,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 60000,
    });
    res.cookie("isLoggedIn", "1", { maxAge: 60000 });
    res.cookie("asd", "dfgh", { SameSite: "Lax" });
    return res.redirect(process.env.CLIENT_URL);
  }
  const user = new User({
    googleId: decoded.payload.sub,
    name: decoded.payload.name,
    imageUrl: decoded.payload.picture,
  });
  const savedUser = await user.save();
  const token = jwt.sign(
    {
      _id: savedUser._id,
    },
    keys.jwtSecret,
    { expiresIn: "1h" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax",
    maxAge: 60000,
  });
  res.cookie("asd", "dfgh", { SameSite: "Lax" });
  res.cookie("isLoggedIn", "1", { maxAge: 60000 });
  res.redirect(process.env.CLIENT_URL);
};

exports.getLogout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({});
};

exports.getIsLoggedIn = (req, res, next) => {
  res.status(200).json({});
};
