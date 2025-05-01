const express = require("express");
const userMiddleware = require("../middlewares/user.middleware");
const router = express.Router();
const {
  createPayment,
  paymentWebhook,
  verifyPayment,
} = require("../controllers/payment.controller");

router.post("/create", userMiddleware, createPayment);
router.post("/webhook", paymentWebhook);
router.get("/verify", userMiddleware, verifyPayment);

module.exports = router;
