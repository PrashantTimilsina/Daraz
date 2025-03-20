const bcrypt = require("bcryptjs");
const User = require("./../model/userModal");
const jwt = require("jsonwebtoken");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = async (req, res, next) => {
  const { name, password, email, passwordConfirm } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "fail",
        message: "User already exists. You can login",
      });
    }
    const newUser = await User.create({
      name,
      password,
      email,
      passwordConfirm,
    });
    const token = signToken(newUser._id);
    res.status(200).json({
      status: "success",
      token,
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Sign up failed please check the data",
    });
  }
};
exports.login = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "User doesnot exists. Please signup",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      status: "fail",
      message: "Wrong password or email",
    });
  }

  const token = signToken(user._id);
  res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 1000 });
  return res.status(200).json({
    status: "success",
    token,
    name: user.name,
  });
};
exports.ensureAuthenticated = async (req, res, next) => {
  // const auth = req.headers["authorization"];
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized, JWT token is required",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Error occured in verification of token",
    });
  }
};
