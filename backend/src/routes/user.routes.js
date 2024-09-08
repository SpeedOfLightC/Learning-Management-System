import { Router } from "express";
import { getUserProfile, loginUser, registerUser, verifyUser } from "../controllers/user.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/verify-user").post(verifyUser);
router.route("/login").post(loginUser);
router.route("/get-user-info").get(verifyAccessToken, getUserProfile);


export default router;