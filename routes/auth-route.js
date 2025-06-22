const express = require("express");
const {
  loginUser,
  registerUser,
} = require("../controllers/auth-controller.js");

const router = express.Router();

// regerter
router.post("/register", registerUser);

//login
router.post("/login", loginUser);

module.exports = router;
