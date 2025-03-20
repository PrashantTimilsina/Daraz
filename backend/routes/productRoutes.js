const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");
router.get("/", productController.getProduct);
router.get("/:id", productController.getProductById);
router.delete("/delete", productController.deleteAll);
module.exports = router;
