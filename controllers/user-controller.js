const User = require("../models/user.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(400).json({
        success: false,
        message: "No user find",
        data: null,
      });
    }

    res.status(201).json({
      success: false,
      message: "User has been fetched",
      data: users,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: e,
    });
  }
};

module.exports = {
  getUsers,
};
