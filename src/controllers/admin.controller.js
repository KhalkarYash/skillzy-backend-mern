const { Admin, Course } = require("../models/db");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { username, password, mobile, name } = req.body;

    if (!username || !password || !mobile || !name) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number." });
    }

    const isExisting = await Admin.findOne({ username });
    if (isExisting) {
      throw new Error("Admin already exists! Login to continue.");
    }

    const salt = process.env.SALT;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      mobile,
      username,
      password: hashedPassword,
    });

    const savedAdmin = await newAdmin.save();

    const token = await savedAdmin.getAdminJWT();

    res
      .cookies("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ message: "Admin created successfully!", data: savedAdmin });
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

    const user = await Admin.findOne({ username });
    if (!user) {
      throw new Error("Admin doesn't exist!");
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = await user.getAdminJWT();

    res
      .cookies("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ message: "Admin logged in successfully!", data: user });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error.message });
  }
};

const logout = async (req, res) => {
  try {
    res
      .cookies("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now()),
      })
      .status(200)
      .json({ message: "Admin logged out successfully!" });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error.message });
  }
};

const addCourse = async (req, res) => {
  try {
    const { title, description, imageLink, price } = req.body;

    const course = new Course({
      title,
      description,
      imageLink,
      price,
    });

    await course.save();
    res.status(200).json({ message: "Course created successfully!" });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error.message });
  }
};

module.exports = { signup, login, logout, addCourse };
