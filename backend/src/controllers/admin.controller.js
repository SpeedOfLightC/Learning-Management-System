import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Course } from "../models/courses.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
        image: image.url
    })

    return res.status(201)
        .json(
            new ApiResponse(
                200,
                course,
                "Course created successfully"
            )
        )
})

export {
    createCourse
}