const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const express = require("express");
// const {Server}=require('socket.io');
const app = express();
const cors = require("cors");
// const http=require('http');
// const server=http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });


const productRouter = require("./routes/productRoutes");
const saleRouter = require("./routes/saleRoutes");
const userRouter = require("./routes/userRoutes");
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "public/images")));
dotenv.config();
// app.use(cors());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

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
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });