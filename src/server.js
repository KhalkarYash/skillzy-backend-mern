const express = require("express");
const app = express();
const cors = require("cors");
const adminRouter = require("./routes/admin.route");
const userRouter = require("./routes/user.route");
const paymentRouter = require("./routes/payment.route");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");
const { Course } = require("./models/db");
require("dotenv").config();

app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.get("/courses", async (req, res) => {
  try {
    const allCourses = await Course.find({});

    res.status(200).json({ courses: allCourses });
  } catch (error) {
    res.status(404).json({ message: "ERROR: " + error.message });
  }
});

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
