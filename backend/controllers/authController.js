const bcrypt = require("bcryptjs");
const User = require("./../model/userModal");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("./../utils/mailer");
const { default: mongoose } = require("mongoose");

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
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,          // ⬅️ ensures cookie is only sent over HTTPS
  sameSite: "None",      // ⬅️ required for cross-origin cookie usage
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
});

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
      role: user?.role,
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
  secure: true,          // ⬅️ ensures cookie is only sent over HTTPS
  sameSite: "None",      // ⬅️ required for cross-origin cookie usage
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
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
  secure: true,
  sameSite: "None"
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
    res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None"
});

    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Bad request" });
  }
};
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save reset token & expiration in DB
    user.resetToken = resetToken;
    user.tokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Send reset email
    sendEmail(email, user.name, resetToken);

    res.json({ message: "Password reset email sent!", token: resetToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.resetPassword = async (req, res, next) => {
  try {
    const { newPassword, confirmNewPassword } = req.body;
    const { token } = req.params;
    const user = await User.findOne({
      resetToken: token,
      tokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        message: "Token expired or invalid",
      });
    }
    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm new password donot match" });
    }
    user.password = newPassword;

    user.resetToken = undefined;
    user.tokenExpiry = undefined;
    res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None"
});

    await user.save();
    return res.status(200).json({ message: "Password changed successfully✅" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Password reset operation failed❌" });
  }
};
exports.fileUpload = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  user.image = req?.file?.filename;
  console.log(user);
  await user.save();
  res.status(200).json({
    status: "success",
    user,
  });
};

{
  /*ADMIN PANEL*/
}

exports.search = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user Id",
    });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "No user found",
    });
  }
  return res.status(200).json({
    status: "success",
    user,
  });
};
exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { newName } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({
      status: "fail",
      error: "Please try again",
    });
  }
  user.name = newName;
  await user.save();
  res.status(200).json({
    status: "success",
    user,
  });
};
exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  const user = await User.deleteOne({ _id: id });

  res.status(200).json({
    message: "User deleted",
  });
};
