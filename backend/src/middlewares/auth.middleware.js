import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyAccessToken = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Access token not found");
        }

        const decodedToken = jwt.verify(token, process.env.ACESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
            throw new ApiError(401, "User not found!!");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})

export const verifyAdmin = asyncHandler(async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            throw new ApiError(401, "You are not authorized to perform this action")
        }

        next();
    } catch (error) {
        throw new ApiError(401, error?.message)
    }
})