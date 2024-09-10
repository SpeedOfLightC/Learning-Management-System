import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Course } from "../models/courses.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, duration, category, createdBy } = req.body;

  const imageLocalPath = req.file?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image.url) {
    throw new ApiError(500, "Failed to upload image");
  }

  // console.log("Image Url: ", image.url);

  const course = await Course.create({
    title,
    description,
    price,
    duration,
    category,
    createdBy,
    image: image.url,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, course, "Course created successfully"));
});

const addLecture = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  const { title, description } = req.body;
  const videoLocalPath = req.file?.path;

  const video = await uploadOnCloudinary(videoLocalPath);

  if (!video.url) {
    throw new ApiError(500, "Failed to upload video");
  }

  const lecture = await Lecture.create({
    title,
    description,
    video: video.url,
    course: course._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, lecture, "Lecture added successfully"));
});

const deleteLecture = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  await lecture.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, "Lecture deleted successfully"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  await Lecture.find({ course: course._id }).deleteMany();
  await course.deleteOne();

  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  return res
    .status(200)
    .json(new ApiResponse(200, "Course deleted successfully"));
});

const getAllStats = asyncHandler(async (req, res) => {
  const totalCourses = (await Course.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;

  const stats = {
    totalCourses,
    totalLectures,
    totalUsers,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "Stats fetched successfully"));
});

export { createCourse, addLecture, deleteLecture, deleteCourse, getAllStats };
