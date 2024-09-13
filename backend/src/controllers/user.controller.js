import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import sendMail from "../middlewares/mail.middleware.js";
import jwt from "jsonwebtoken";

const options = {
  httpOnly: true,
  secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (user) {
    throw new ApiError(400, "User already exists");
  }

  const otp = Math.floor(Math.random() * 1000000);
  // console.log("sent otp:", otp);

  const accessToken = jwt.sign(
    {
      email,
      name,
      password,
      otp,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  const data = {
    name,
    otp,
  };

  await sendMail(email, "LMS OTP Verification", data);

  return res.status(200).json({
    message: "OTP sent to your mail",
    accessToken,
  });
});

const verifyUser = asyncHandler(async (req, res) => {
  const { otp, token } = req.body;

  const decodedToken = jwt.verify(token, process.env.ACESS_TOKEN_SECRET);

  // console.log(decodedToken);

  if (!decodedToken) {
    throw new ApiError(400, "Invalid Access Token");
  }

  if (decodedToken.otp != otp) {
    // console.log("here i am");
    throw new ApiError(400, "Invalid OTP");
  }

  const createdUser = await User.create({
    name: decodedToken.name,
    email: decodedToken.email,
    password: decodedToken.password,
  });

  if (!createdUser) {
    throw new ApiError(400, "User not created");
  }

  const accessToken = createdUser.generateAccessToken();

  const user = await User.findById(createdUser._id).select("-password");

  return res.status(201).cookie("acessToken", accessToken, options).json(
    new ApiResponse(
      200,
      {
        user,
        accessToken,
      },
      "User created successfully"
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword) {
    throw new ApiError(400, "Invalid password");
  }

  const accessToken = user.generateAccessToken();

  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged in successfully"
      )
    );
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully"));
});

export { registerUser, verifyUser, loginUser, getUserProfile };
