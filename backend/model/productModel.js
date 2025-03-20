const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  price: Number,
  category: String,
  cashOnDelivery: Boolean,
  warrantyAvailable: Boolean,
  location: String,
});
const Product = new mongoose.model("Product", productSchema);
module.exports = Product;
