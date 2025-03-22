const Product = require("../model/productModel");

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    // res.cookie("prashant", "timilsina");
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
exports.getProductById = async (req, res) => {
  try {
    // const id=req.params.id;
    const product = await Product.find({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
exports.deleteAll = async (req, res) => {
  try {
    const sale = await Sale.deleteMany();
    res.status(200).json({
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
exports.deleteAll = async (req, res) => {
  try {
    const product = await Product.deleteMany();
    res.status(200).json({
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
