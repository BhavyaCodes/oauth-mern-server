const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    name: String,
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
