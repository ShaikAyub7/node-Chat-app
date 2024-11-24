const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const register = async (req, res) => {
  // const { name, email, password } = req.body;
  const users = await User.create(req.body);
  const token = users.createJWT();
  res.status(200).json({
    user: {
      email: users.email,
      lastName: users.lastName,
      loaction: users.location,
      name: users.name,
      token,
    },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res.status(200).json({
    user: {
      email: user.email,
      name: user.name,
      token,
    },
  });
};
const logout = (req, res) => {
  res.send("register");
};
module.exports = {
  register,
  login,
  logout,
};
