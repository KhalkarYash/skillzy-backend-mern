const express = require("express");
const {
  signup,
  login,
  purchaseCourse,
  myCourses,
  logout,
  verifyUser,
} = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");
const router = express.Router();

router.get("/me", userMiddleware, verifyUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", userMiddleware, logout);
router.post("/purchase-course/:courseId", userMiddleware, purchaseCourse);
router.get("/my-courses", userMiddleware, myCourses);

module.exports = router;
