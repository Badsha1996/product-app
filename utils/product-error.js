const getProductError = (error, res) => {
  console.error(error);
  res.status(500).send({
    message: "something went wrong",
    success: false,
    error: error.message || "unknown error",
  });
};

module.exports = getProductError;
