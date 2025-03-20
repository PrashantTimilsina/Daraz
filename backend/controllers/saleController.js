const Sale = require("../model/saleModel");

exports.getSale = async (req, res) => {
  try {
    const saleProducts = await Sale.find();
    res.status(200).json({
      status: "success",
      data: {
        saleProducts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getSaleById = async (req, res) => {
  try {
    const id = req.params.id;
    const sale = await Sale.findById({ _id: id });
    res.status(200).json({
      status: "success",
      data: {
        sale,
      },
    });
  } catch (error) {
    res.status(200).json({
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
