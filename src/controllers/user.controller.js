const { User } = require("../models/db");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { username, password, mobile, name } = req.body;

    if (!(username && password && mobile && name)) {
      throw new Error("All fields are required.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(mobile)) {
      throw new Error("Invalid mobile number.");
    }

    const isExisting = await User.findOne({ username });
    if (isExisting) {
      throw new Error("User already exists! Login to continue.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      mobile,
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = await savedUser.getUserJWT();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.SERVER === "production",
        sameSite: "None",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ message: "User created successfully!", data: savedUser });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User doesn't exist!");
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = await user.getUserJWT();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.SERVER === "production",
        sameSite: "None",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ message: "User logged in successfully!", data: user });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error.message });
  }
};

const logout = async (req, res) => {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        secure: process.env.SERVER === "production",
        sameSite: "None",
        expires: new Date(Date.now()),
      })
      .status(200)
      .json({ message: "User logged out successfully!" });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error.message });
  }
};

const purchaseCourse = async (req, res) => {
  const { courseId } = req.params;
};

const myCourses = async (req, res) => {
  try {
    const user = req.user;
    const userCourses = await User.findById(user._id).populate(
      "purchasedCourses"
    );

    if (!userCourses.courses) {
      return res.status(404).json({ message: "User hasn't purchased any course!" });
    }

    res.status(200).json({ courses: userCourses.purchasedCourses });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error.message });
  }
};

module.exports = {
  signup,
  login,
  logout,
  purchaseCourse,
  myCourses,
};
