const axios = require("axios").default;

module.exports = axios.create({
  baseURL: "https://accounts.google.com/o/oauth2/v2/auth",
});
