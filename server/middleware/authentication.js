const jwt = require("jsonwebtoken");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomApiError,
} = require("../errors");
const authenticationMiddleWare = async (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    throw new UnauthenticatedError("Please Sign in first");
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  const { name, userId } = decode;
  req.user = { id: userId, name: name };
  next();
};

module.exports = authenticationMiddleWare;
