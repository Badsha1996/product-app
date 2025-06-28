const adminMiddleware = (req, res, next) => {
  if (req.userInfo.role !== "admin") {
    res.send(401).json({
      success: false,
      message: "You are not permitted to perfom this operation",
    });
  }
  next();
};

module.exports = adminMiddleware;
