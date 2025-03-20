const express = require("express");
const app = express();
const cors = require("cors");
const productRouter = require("./routes/productRoutes");
const saleRouter = require("./routes/saleRoutes");
const userRouter = require("./routes/userRoutes");
app.use((req, res, next) => {
  const allowedOrigin = "http://localhost:5173";
  console.log("first:", req.headers.origin);
  // Check if the request origin matches the allowed origin
  if (req.headers.origin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    console.log("done");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
      console.log("options");
      return res.sendStatus(200);
    }
    next();
  } else {
    return res.status(403).send("FORBIDDEN REQUEST BRO");
  }
});

app.use(express.json());
app.use("/sale", saleRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
module.exports = app;
