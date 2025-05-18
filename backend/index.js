const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const express = require("express");
// const {Server}=require('socket.io');
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const productRouter = require("./routes/productRoutes");
const saleRouter = require("./routes/saleRoutes");
const userRouter = require("./routes/userRoutes");
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "public/images")));
dotenv.config();
// app.use(cors());

//SECURITY CODE
app.use(helmet());

//rate limiter

const limiter = rateLimit({
  max: 150, // limit each IP to 100 requests
  windowMs: 60 * 60 * 1000, // per hour
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use(limiter);
app.use(express.json({ limit: "10kb" }));

//prevent from no sql injection
app.use(mongoSanitize());
//data sanitization
app.use(xss());
//reject duplicate query parameter
app.use(hpp());

app.use(cookieParser());
app.use(cors({ origin: "https://daraz-frontend-jcr3.onrender.com", credentials: true }));

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
