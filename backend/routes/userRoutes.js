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
router.get(
  "/profile",
  authController.ensureAuthenticated,
  authController.getProfile
);
router.post(
  "/changePassword",
  authController.ensureAuthenticated,
  authController.changePassword
);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/reset/:token", authController.resetPassword);
module.exports = router;
