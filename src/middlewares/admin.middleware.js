const { Admin } = require("../models/db");
const jwt = require("jsonwebtoken");

const adminMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({ message: "Please login!" });
    }

    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;

    if (decodedObj.role !== "admin") {
      return res.status(400).json({ message: "Access denied! Admins only" });
    }

    const user = await Admin.findOne({ _id });
    if (!user) {
      throw new Error("User not found!");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: "ERROR" + err.message });
  }
};

module.exports = adminMiddleware;
