const express = require("express");
const authController = require("./../controllers/authController");
const authValidator = require("./../middlewares/authValidation");
const router = express.Router();

router.post("/signup", authValidator.signupValidation, authController.signup);
router.post(
  "/login",
  authValidator.loginValidation,

  authController.login
);
module.exports = router;
