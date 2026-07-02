const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/auth.middleware");

const { registerUser, loginUser, logoutUser, getCurrentUser, verifyOtp, sendOtp, updateUsername, updateEmail, updatePassword, forgotPassword } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/update-username",authMiddleware, updateUsername);
router.post("/update-email", authMiddleware, updateEmail);
router.post("/update-password", authMiddleware, updatePassword);
router.post("/forgot-password", forgotPassword);

module.exports = router;