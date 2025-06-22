const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [3, "The password is too short"],
  },
  role: {
    type: String,
    enum:["user", "admin"],
    default: "user"
  }
},{timestamps : true});

module.exports = mongoose.model("User", UserSchema);
