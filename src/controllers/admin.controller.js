const { Admin } = require("../models/db");

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isExisting = await Admin.findOne({ username });
    if (isExisting) {
      throw new Error("User already exists! Login to continue.");
    }

    validateData(req);

    const salt = process.env.SALT;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ username, password: hashedPassword });

    
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error.message });
  }
};

const login = async (req, res) => {};

const logout = async (req, res) => {};

const addCourse = async (req, res) => {};

const getCourse = async (req, res) => {};

module.exports = { signup, login, logout, addCourse, getCourse };
