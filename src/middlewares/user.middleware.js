const { User } = require("../models/db");

const userMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({ message: "Please Login!" });
    }

    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;

    if (decodedObj.role !== "user") {
      return res.status(400).json({ message: "Access denied! Users only" });
    }

    const user = await User.findOne({ _id });

    if (!user) {
      throw new Error("User not found!");
    }

    req.user = user;
    req.user.role = "role";
    next();
  } catch (err) {
    res.status(400).json({ message: "ERROR: " + err.message });
  }
};

module.exports = userMiddleware;
