// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  email: { type: String, unique: true },
  name: String,
  picture: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
