const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  token: String,
  username: String,
  email: String,
  password: String,
  date: { type: Date, default: Date.now },
  bookmarks: [{
  }],
});

const User = mongoose.model("users", userSchema);
module.exports = User;
