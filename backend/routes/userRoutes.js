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
router.use("/checkauth", authController.checkAuth);
router.post("/logout", authController.logout);
module.exports = router;
