const express = require("express");
const axios = require("axios").default;

const googleApi = require("../api/google");
const keys = require("../config/keys");

const router = express.Router();

router.get("/auth/google", async (req, res, next) => {
  // res.redirect("https://www.google.com/");
  // googleApi.get('/',{
  // 	params:{
  // 		redirect_uri:"localhost:5000/auth/google/callback",
  // 		prompt: "consent",
  // 		response_type: "code",
  // 		client_id: keys.googleClientID,
  // 		scope: 'openid',
  // 		access_type:'offline'
  // 	}
  // })
  res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:5000/auth/google/callback&prompt=consent&response_type=code&client_id=${keys.googleClientID}&scope=openid&access_type=offline`
  );
});

router.get("/auth/google/callback", async (req, res, next) => {
  console.log(req.query);
  const code = req.query.code;
  const data = await axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: keys.googleClientID,
    client_secret: keys.googleClientSecret,
    redirect_uri: "http://localhost:5000/auth/google/callback",
    grant_type: "authorization_code",
  });
  console.log(data.data);
  res.json(data.data);
});

module.exports = router;
