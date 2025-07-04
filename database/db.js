const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("There was an error connecting to the database:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
