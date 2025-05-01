const express = require("express");
const {
  signup,
  login,
  addCourse,
  logout,
} = require("../controllers/admin.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", adminMiddleware, logout);
router.post("/addCourse", adminMiddleware, addCourse);

module.exports = router;
