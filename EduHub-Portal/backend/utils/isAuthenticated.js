// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import ExpressError from "../utils/ExpressError.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.log("❌ No token found in cookies");
      throw new ExpressError(401, "Unauthorized - No token provided");
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    // Fetch user details
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      console.log("❌ No user found for token");
      throw new ExpressError(401, "User not found");
    }

    // ✅ Attach user to request for downstream use
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    // Send a direct response to make debugging easier in dev
    return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
  }
};
