const express = require("express");
const router = express.Router();
const saleController = require("./../controllers/saleController");
router.get("/", saleController.getSale);
router.get("/:id", saleController.getSaleById);
router.delete("/delete", saleController.deleteAll);
module.exports = router;
