const { Admin, Course } = require("../models/db");
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
      throw new Erro("Invalid mobile number.");
    }

    const isExisting = await Admin.findOne({ username });
    if (isExisting) {
      throw new Error("Admin already exists! Login to continue.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      mobile,
      username,
      password: hashedPassword,
    });

    const savedAdmin = await newAdmin.save();

    const token = await savedAdmin.getAdminJWT();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.SERVER === "production",
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
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.SERVER === "production",
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
      .cookie("token", "", {
        httpOnly: true,
        secure: process.env.SERVER === "production",
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
    const { title, description, imageLink, price, author } = req.body;

    if (!(title && description && imageLink && price && author)) {
      throw new Error("All fields are required.");
    }

    const course = new Course({
      title,
      description,
      imageLink,
      price,
      author,
    });

    await course.save();
    res.status(200).json({ message: "Course created successfully!" });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error.message });
  }
};

const verifyAdmin = (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ message: "Admin details", user });
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(401).json({ message: "Please Login!" });
  }
};

module.exports = { signup, login, logout, addCourse, verifyAdmin };
