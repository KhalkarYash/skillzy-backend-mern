const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const AdminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
});

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
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

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    notes: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      membershipType: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

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
const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = { Admin, User, Course, Payment };
