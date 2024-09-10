import { Router } from "express";
import {
  verifyAccessToken,
  verifyAdmin,
} from "../middlewares/auth.middleware.js";
import {
  checkOut,
  fetchLecture,
  fetchLectures,
  getAllCourses,
  getSingleCourse,
  getUserCourses,
  verifyPayment,
} from "../controllers/course.controller.js";

const router = Router();

router.route("/get-all-course").get(getAllCourses);
router.route("/get-single-course/:id").get(getSingleCourse);
router.route("/get-lectures/:id").get(verifyAccessToken, fetchLectures);
router.route("/get-lecture/:id").get(verifyAccessToken, fetchLecture);
router.route("/get-user-course").get(verifyAccessToken, getUserCourses);
router.route("/checkout/:id").post(verifyAccessToken, checkOut);
router.route("/verify-payment/:id").post(verifyAccessToken, verifyPayment);

export default router;
