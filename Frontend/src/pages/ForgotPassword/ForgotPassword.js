import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false); // Controls view switching
    const [loading, setLoading] = useState(false);

    // const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Step 1: Request OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:5000/api/auth/send-otp", 
                { email, purpose: 'forgot_password' }
            );

            toast(response.data.message || "Verification code sent!");
            setIsOtpSent(true); // Toggle OTP container visibility
        } catch (error) {
            toast.error(
                error.response?.data?.message || 
                "Failed to send verification code."
            );
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp) {
            toast.error("Please enter the OTP");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:5000/api/auth/verify-otp",
                {
                    email,
                    otp,
                    purpose: "forgot_password"
                },
                { withCredentials: true }
            );

            toast.success(response.data.message);
            navigate("/password-reset", {
                state: {
                    resetToken: response.data.resetToken
                }
            });
            // setIsAuthenticated?.(true);
            // navigate("/dashboard"); // Take them directly to the app dashboard
        } catch (error) {
            toast.error(
                error.response?.data?.message || 
                "OTP verification failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-card">
                <h1>Forgot Password?</h1>
                
                {/* Condition 1: Ask for Email */}
                {!isOtpSent ? (
                    <>
                        <p>
                            Enter your email address below and we'll send you a 
                            verification code to reset your password.
                        </p>

                        <form onSubmit={handleSendOtp}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <button type="submit" disabled={loading}>
                                {loading ? "Sending..." : "Send Reset Code"}
                            </button>
                        </form>
                    </>
                ) : (
                    /* Condition 2: OTP Sent - Show verification form */
                    <>
                        <p>
                            We've sent a verification code to <br />
                            <strong>{email}</strong>
                        </p>

                        <form onSubmit={handleVerifyOtp}>
                            <input
                                className="otp-input"
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                required
                            />

                            <button type="submit" disabled={loading}>
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </form>

                        <button 
                            className="resend-btn" 
                            onClick={handleSendOtp}
                            disabled={loading}
                        >
                            Resend OTP
                        </button>
                    </>
                )}

                <hr className="divider" />

                <button 
                    className="back-to-login-btn" 
                    onClick={() => navigate("/")}
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;