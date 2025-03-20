const mongoose = require("mongoose");
const saleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  price: Number,
  discountPercentage: Number,
  cashOnDelivery: Boolean,
  warrantyAvailable: Boolean,
  location: String,
});
const Sale = new mongoose.model("Sale", saleSchema);
module.exports = Sale;
