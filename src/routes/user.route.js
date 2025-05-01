const express = require("express");
const {
  signup,
  login,
  purchaseCourse,
  myCourses,
} = require("../controllers/user.controller");
const { logout } = require("../controllers/admin.controller");
const userMiddleware = require("../middlewares/user.middleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", userMiddleware, logout);
router.post("/purchase-course", userMiddleware, purchaseCourse);
router.get("/my-courses", userMiddleware, myCourses);

module.exports = router;
