const express = require("express");
const authController = require("./../controllers/authController");
const authValidator = require("./../middlewares/authValidation");
const multer = require("multer");
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
router.post(
  "/forgotPassword",
  authController.ensureAuthenticated,
  authController.forgotPassword
);
router.get("/search/:id", authController.search);
router.delete("/deleteuser", authController.deleteUser);
router.post("/reset/:token", authController.resetPassword);
router.post("/update/:id", authController.update);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });
router.post(
  "/upload",
  authController.ensureAuthenticated,
  upload.single("file"),
  authController.fileUpload
);
module.exports = router;
