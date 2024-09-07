import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import sendMail from '../middlewares/mail.middleware.js';

const options = {
    httpOnly: true,
    secure: true
}

const registerUser = asyncHandler(async (req, res) => {
    console.log("here");
    
    const { email, name, password } = req.body;

    const user = await User.findOne({
        $or: [{ email }]
    })

    if (user) {
        return new ApiError(400, "User already exists");
    }

    const otp = Math.floor(Math.random() * 1000000);
    // const accessToken = user.generateAccessToken();

    const data = {
        name,
        otp
    }

    await sendMail(
        email,
        "LMS OTP Verification",
        data
    );    

    res.status(200)
        .json(
            {
                message: "OTP sent to your mail",
                // accessToken
            }
        );

    // const newUser = await User.create({
    //     email,
    //     name,
    //     password
    // })

    // const createdUser = await User.findById(newUser._id).select("-password");

    // if (!createdUser) {
    //     return new ApiError(500, "User not created");
    // }

    // return res.status(201)
    //     .cookie("accessToken", accessToken, options)
    //     .json(
    //         new ApiResponse(200,
    //             {
    //                 user: createdUser,
    //                 accessToken
    //             }, "User created successfully")
    //     )
});

export {
    registerUser
}