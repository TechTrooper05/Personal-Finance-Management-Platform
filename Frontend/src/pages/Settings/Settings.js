import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import api from '../../Utils/api';
import toast from "react-hot-toast";
import './Settings.css';

function Settings() {
    const { isAuthenticated, user, fetchUser } = useAuth();
    const navigate = useNavigate();
    
    // Route Protection Guardrail
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    // Active Edit States ("username" | "email" | "password" | null)
    const [activeForm, setActiveForm] = useState(null);
    const [loading, setLoading] = useState(false);

    // Form Field States
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // Reset fields when changing active sections
    const closeForm = () => {
        setActiveForm(null);
        setNewUsername("");
        setNewEmail("");
        setCurrentPassword("");
        setNewPassword("");
    };

    // 1. Handle Username Change API Call
    const handleUpdateUsername = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await api.post("/api/auth/update-username", {
                newUsername,
                password: currentPassword
            }, { withCredentials: true });
            await fetchUser();
            toast.success(response.data.message || "Username updated successfully!");
            closeForm();
            // Optional: You could update your local `user` context state here if your backend returns the new data
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to change username.");
        } finally {
            setLoading(false);
        }
    };

    // 2. Handle Email Change API Call
    const handleUpdateEmail = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.post("/api/auth/update-email", {
                newEmail,
                password: currentPassword
            }, { withCredentials: true });

            const response = await api.post("/api/auth/send-otp", {
                email: newEmail,
                purpose: "email_change"
            }, { withCredentials: true });
            toast(response.data.message || "Verification OTP sent to your new email!");
            
            // Hand off to OTP check with required state context
            navigate("/verify-otp", { 
                state: { 
                    email: newEmail, 
                    purpose: "email_change" 
                } 
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to initiate email change.");
        } finally {
            setLoading(false);
        }
    };

    // 3. Handle Password Change API Call
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await api.post("/api/auth/update-password", {
                currentPassword,
                newPassword
            }, { withCredentials: true });
            
            toast.success(response.data.message || "Password updated successfully!");
            closeForm();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update password.");
        } finally {
            setLoading(false);
        }
    };

    // Prevent crashing on initial hook render if user data is still being loaded by Context
    if (!user) return null;

    return (
        <div className="settings-page-container">
            <div className="settings-container">
                <div className="header-container">
                    <p className="account-settings">Account Settings</p>
                    <p className="info-message">Manage your profile information and security.</p>
                </div>

                {/* Profile Information Block */}
                <div className="profile-info-container">
                    <div className="profile-header">Profile Information</div>

                    {/* Username Block */}
                    <div className={`profile-username ${activeForm === "username" ? "expanded-form-row" : ""}`}>
                        {activeForm !== "username" ? (
                            <>
                                <div className="profile-username-left">
                                    <div className="profile-username-header">Username</div>
                                    <div className="profile-username-text">{user.username}</div>
                                </div>
                                <div className="profile-username-right">
                                    <button onClick={() => setActiveForm("username")}>Change Username</button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleUpdateUsername} className="inline-settings-form">
                                <div className="form-inputs-group">
                                    <input 
                                        type="text" 
                                        placeholder="New Username" 
                                        value={newUsername} 
                                        onChange={(e) => setNewUsername(e.target.value)} 
                                        required 
                                    />
                                    <input 
                                        type="password" 
                                        placeholder="Confirm Password" 
                                        value={currentPassword} 
                                        onChange={(e) => setCurrentPassword(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-actions-group">
                                    <button type="submit" className="save-btn" disabled={loading}>{loading ?"Saving...":"Save"}</button>
                                    <button type="button" className="cancel-btn" onClick={closeForm}>Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Email Block */}
                    <div className={`profile-email ${activeForm === "email" ? "expanded-form-row" : ""}`}>
                        {activeForm !== "email" ? (
                            <>
                                <div className="profile-email-left">
                                    <div className="profile-email-header">Email Address</div>
                                    <div className="profile-email-text">{user.email}</div>
                                </div>
                                <div className="profile-email-right">
                                    <button disabled onClick={() => setActiveForm("email")}>Change Email</button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleUpdateEmail} className="inline-settings-form">
                                <div className="form-inputs-group">
                                    <input 
                                        type="email" 
                                        placeholder="New Email Address" 
                                        value={newEmail} 
                                        onChange={(e) => setNewEmail(e.target.value)} 
                                        required 
                                    />
                                    <input 
                                        type="password" 
                                        placeholder="Confirm Password" 
                                        value={currentPassword} 
                                        onChange={(e) => setCurrentPassword(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-actions-group">
                                    <button type="submit" className="save-btn" disabled={loading}>{loading ?"Saving...":"Save"}</button>
                                    <button type="button" className="cancel-btn" onClick={closeForm}>Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Security Block */}
                <div className="security-container">
                    <div className="security-header">Security</div>

                    {/* Password Block */}
                    <div className={`security-password ${activeForm === "password" ? "expanded-form-row" : ""}`}>
                        {activeForm !== "password" ? (
                            <>
                                <div className="security-password-left">
                                    <div className="security-password-header">Password</div>
                                    <div className="security-password-text">••••••••••••••••••</div>
                                </div>
                                <div className="security-password-right">
                                    <button onClick={() => setActiveForm("password")}>Change Password</button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleUpdatePassword} className="inline-settings-form">
                                <div className="form-inputs-group">
                                    <input 
                                        type="password" 
                                        placeholder="Current Password" 
                                        value={currentPassword} 
                                        onChange={(e) => setCurrentPassword(e.target.value)} 
                                        required 
                                    />
                                    <input 
                                        type="password" 
                                        placeholder="New Password" 
                                        value={newPassword} 
                                        onChange={(e) => setNewPassword(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-actions-group">
                                    <button type="submit" className="save-btn" disabled={loading}>{loading ?"Saving...":"Save"}</button>
                                    <button type="button" className="cancel-btn" onClick={closeForm}>Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;