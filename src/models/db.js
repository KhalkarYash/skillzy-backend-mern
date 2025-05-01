const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const AdminSchema = mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

AdminSchema.methods.getAdminJWT = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id, role: "admin" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

UserSchema.methods.getUserJWT = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id, role: "user" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = { Admin, User, Course };
