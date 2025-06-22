const express = require("express");
const env = require("dotenv");
const connectDB = require("./database/db");
const productRoutes = require("./routes/product-route.js");
const authRoutes = require("./routes/auth-route.js");
const userRoutes = require("./routes/user-route.js");
// Initialize
const app = express();
env.config();

// PORT info
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// calling all routes using middleware

// PARENT ROUTE
app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
