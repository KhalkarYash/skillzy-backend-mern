const express = require("express");
const app = express();
const cors = require("cors");
const adminRouter = require("./routes/admin.route");
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");
require("dotenv").config();

app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    console.log("Database connection successfully!");
    app.listen(PORT, () => {
      console.log("Server is running on " + PORT);
    });
  })
  .catch(() => {
    console.log("Database connection failed!");
  });
