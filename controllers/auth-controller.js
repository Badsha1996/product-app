const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// WHAT IS THE BASIC AUTHARATIZATION

// Register
const registerUser = async (req, res) => {
  try {
    // register
    // take data from user
    const { username, email, password, role } = req.body;

    // If user is already exist
    const isUserExist = await User.findOne({ $or: [{ email }] });

    if (isUserExist) {
      res.status(400).json({
        success: false,
        message: "This user already exist",
      });
    }
    // encrypt that data
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save it to database
    const createdUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role: role || "user",
    });

    if (createdUser) {
      res.status(201).send({
        success: true,
        message: "new user has been created!",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "failed to create new user. Please try again",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: e,
    });
  }
};

// Log in user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // If the user exist
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "This User does not exist",
      });
    }

    // encrypiton pass => dcrypt
    const isPassMatched = await bcrypt.compare(password, user.password);

    if (!isPassMatched) {
      res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Token -> hacking stop, auto logout, API restrict etc. etc
    const accessToken = await jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "30m" }
    );

    res.status(201).json({
      success: true,
      message: "Logged In",
      accessToken,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: e,
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
