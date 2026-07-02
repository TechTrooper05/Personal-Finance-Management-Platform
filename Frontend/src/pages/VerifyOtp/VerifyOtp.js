import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../Context/AuthContext'
import './VerifyOtp.css'
import toast from "react-hot-toast";
import api from '../../Utils/api';

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const { setIsAuthenticated, fetchUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const {email, purpose} = location.state;

    if (!email) {
    return (
        <div>
            <h3>Invalid access</h3>
            <button onClick={() => navigate("/")}>
            Go to Login
            </button>
        </div>
        );
    }
    const handleVerify = async (e) => {
        e.preventDefault();

        if (!otp) {
            toast.error("Please enter the OTP");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                "/api/auth/verify-otp",
                {
                    email,
                    otp,
                    purpose
                },
                {
                    withCredentials: true
                }
            );

            toast.success(response.data.message);
            setIsAuthenticated?.(true);
            if (purpose==='email_change') {
                await fetchUser();
                navigate("/settings");
            }
            else {
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "OTP verification failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await api.post(
                "/api/auth/send-otp",
                {
                    email
                }
            );

            toast.success(response.data.message);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to resend OTP."
            );
        }
    };

    return (
        <div className="verify-container">
            <div className="verify-card">
                <h1>Verify Your Email</h1>

                <p>
                    We've sent a verification code to
                </p>

                <p>
                    <strong>{email}</strong>
                </p>

                <form onSubmit={handleVerify}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Verifying..."
                            : "Verify OTP"}
                    </button>
                </form>

                <button
                    className="resend-btn"
                    onClick={handleResendOtp}
                >
                    Resend OTP
                </button>
            </div>
        </div>
    );
};

export default VerifyOtp;