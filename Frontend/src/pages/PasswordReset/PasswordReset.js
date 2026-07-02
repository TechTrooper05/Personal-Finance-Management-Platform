import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from '../../Utils/api';
import toast from "react-hot-toast";
import "./PasswordReset.css";

const PasswordReset = () => {
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    // const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Grab the verified email passed from the prior step state
    const resetToken = location.state?.resetToken;

    // Security Guardrail: Prevent users from visiting this URL directly
    if (!resetToken) {
        return (
            <div className="reset-container">
                <div className="reset-card">
                    <h3>Invalid Access</h3>
                    <p>Please initiate the password reset process from the beginning.</p>
                    <button onClick={() => navigate("/")}>Go to Login</button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword) {
            toast.error("Please enter a new password");
            return;
        }

        // if (newPassword.length < 6) {
        //     toast.error("Password must be at least 6 characters long");
        //     return;
        // }

        try {
            setLoading(true);

            // API Call updating the password in the database
            const response = await api.post(
                "/api/auth/forgot-password",
                {
                    resetToken,
                    newPassword
                }
            );

            toast.success(response.data.message || "Password updated successfully!");
            
            // Log the user in directly since they just proved ownership
            // setIsAuthenticated?.(true);
            navigate("/");

        } catch (error) {
            toast.error(
                error.response?.data?.message || 
                "Failed to update password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-container">
            <div className="reset-card">
                <h1>Create New Password</h1>
                
                <p>
                    Your identity has been verified. Enter your new secure 
                    password below to update your account.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordReset;