const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (val) {
        return this.isNew || val === this.password;
      },
    },
    required: function () {
      return this.isNew;
    },
  },
  resetToken: {
    type: String,
  },
  tokenExpiry: {
    type: Date,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
const User = new mongoose.model("User", userSchema);
module.exports = User;
