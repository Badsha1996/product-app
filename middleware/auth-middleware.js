const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(400).json({
      success: false,
      message: "Access denied. invalid token",
    });
  }

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.userInfo = decodeToken;
    next()
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Access denied. invalid token",
    });
  }
};

module.exports = authMiddleware;
