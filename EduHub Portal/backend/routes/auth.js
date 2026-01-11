import express from "express";
import { signUp,logIn,logOut,sendOtp,resetPassword } from "../controllers/authControllers.js";

const router=express.Router();


router.post("/signup",signUp);
router.post("/login",logIn);
router.get("/logout",logOut)
router.post("/forgot-password", sendOtp);
router.post("/reset-password", resetPassword)

export default router;
