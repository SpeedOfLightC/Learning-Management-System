import { asyncHandler } from "../utils/asyncHandler.js";
import { Course } from "../models/courses.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { payment } from "../index.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();

  return res
    .status(200)
    .json(new ApiResponse(200, { courses }, "Courses fetched successfully"));
});

const getSingleCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course fetched successfully"));
});

const fetchLectures = asyncHandler(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { lectures }, "Lectures fetched successfully")
      );
  }

  if (!user.subscription.includes(req.params.id)) {
    throw new ApiError(401, "You are not subscribed to this course");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { lectures }, "Lectures fetched successfully"));
});

const fetchLecture = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res
      .status(200)
      .json(new ApiResponse(200, { lecture }, "Lectures fetched successfully"));
  }

  if (!user.subscription.includes(req.params.id)) {
    throw new ApiError(401, "You are not subscribed to this course");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { lecture }, "Lectures fetched successfully"));
});

const getUserCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ _id: req.user.subscription });

  return res
    .status(200)
    .json(new ApiResponse(200, { courses }, "Courses fetched successfully"));
});

const checkOut = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.params.id);

  if (user.subscription.includes(course._id)) {
    throw new ApiError(400, "You are already subscribed to this course");
  }

  const options = {
    amount: Number(course.price * 100),
    currency: "INR",
  };

  const order = await payment.orders.create(options);

  return res.status(201).json(
    new ApiResponse(
      200,
      {
        order,
        course,
      },
      "Order created successfully"
    )
  );
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto.createHmac(
    "sha256",
    process.env.RAZORPAY_KEY_SECRET
  ).update(body).digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const createdPayment = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    });

    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.params.id);

    user.subscription.push(course._id);
    await user.save();

    return res.status(200)
      .json(
        new ApiResponse(
          200,
          "Payment Successful",
        )
      )
  }
  else {
    throw new ApiError(400, "Payment Failed");
  }
});

export {
  getAllCourses,
  getSingleCourse,
  fetchLectures,
  fetchLecture,
  getUserCourses,
  checkOut,
  verifyPayment
};
