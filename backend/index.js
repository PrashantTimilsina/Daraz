const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const productRouter = require("./routes/productRoutes");
const saleRouter = require("./routes/saleRoutes");
const userRouter = require("./routes/userRoutes");
dotenv.config();
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use("/sale", saleRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 3000;
const DB = process.env.CONNECTION.replace("<PASSWORD>", process.env.PASSWORD);
mongoose.connect(DB).then(() => {
  console.log("DB connection successfull");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
