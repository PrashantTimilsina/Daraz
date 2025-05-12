const express = require("express");
const app = express();
const productRouter = require("./routes/productRoutes");
const saleRouter = require("./routes/saleRoutes");
const userRouter = require("./routes/userRoutes");
// const path = require("path");

// app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/sale", saleRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);

module.exports = app;
