const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).send({ user: { name: user.name } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("invalid Credentials");
  }

  const checkPass = await user.comparePassword(password);
  if (!checkPass) {
    throw new UnauthenticatedError("invalid Credentials");
  }

  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  try {
    req.session.token = token;
    req.session.createdBy = user._id;
    req.session.save();
  } catch (error) {
    console.log(error);
  }

  res
    .status(StatusCodes.OK)
    .send({ user: { username: user.name, ID: user._id, token: token } });
};

const logout = async (req, res) => {
  req.session = null;
  res.status(StatusCodes.OK).send("Logged Out");
};

module.exports = { register, login, logout };
