const razorpayInstance = require("../utils/razorpay");
const { User, Payment, Course } = require("../models/db");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

const createPayment = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const order = await razorpayInstance.orders.create({
      amount: course.price * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        courseTitle: course.title,
      },
    });

    const payment = await Payment.create({
      userId: req.user._id,
      courseId: course._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      notes: order.notes,
    });

    const savePayment = await payment.save();

    res.json({ ...savePayment.toJSON(), key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const paymentWebhook = async (req, res) => {
  try {
    const webHookSignature = req.get("X-Razorpay-Signature");

    const isWebHookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webHookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebHookValid) {
      return res.status(400).send("Invalid webhook signature");
    }

    const { event, payload } = req.body;

    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    payment.status = paymentDetails.status;

    await payment.save();

    if (paymentDetails.status === "captured") {
      const user = await User.findById(payment.userId);
      if (!user.purchasedCourses.includes(payment.courseId)) {
        user.purchasedCourses.push(payment.courseId);
        await user.save();
      }
    }

    res.status(200).json({ message: "Webhook received successfully!" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    console.log(req.body);
    const { orderId } = req.body;

    const payment = await Payment.findOne({ orderId });

    if (!payment) {
      return res.status(404).json({ error: "Payment record not found." });
    }

    if (payment.status === "captured") {
      return res.json({
        success: true,
        message: "Payment successful",
        payment,
      });
    } else {
      return res.json({ success: false, message: "Payment failed", payment });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createPayment, paymentWebhook, verifyPayment };
