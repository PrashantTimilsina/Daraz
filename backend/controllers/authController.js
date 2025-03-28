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
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30 days from login
  });
  return res.status(200).json({
    status: "success",
    token,

    user,
  });
};
exports.ensureAuthenticated = async (req, res, next) => {
  // const token = req.headers["authorization"];
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
exports.checkAuth = async (req, res, next) => {
  const cookies = req.cookies.token;
  if (cookies) {
    return res.status(200).json({ status: "success", cookies });
  } else {
    return res.status(400).json({ message: "Not logged in" });
  }
};
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });
    return res.status(200).json({
      status: "success",
      message: "Logout successfully",
    });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "Please login again" });
    }
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    return res.status(404).json({ message: "Bad request" });
  }
};
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }
    const checkPass = await bcrypt.compare(currentPassword, user.password);
    if (!checkPass) {
      return res
        .status(400)
        .json({ message: "Current password doesnot match" });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Bad request" });
  }
};
