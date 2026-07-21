import React, { useEffect, useState } from "react";
import api from '../../Utils/api';
import "./Landing.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import AnimatedSection from "../../components/AnimatedSections/AnimatedSections";

const Landing = () => {
    // const [theme, setTheme] = useState("dark-purple");
    const [activeTab, setActiveTab] = useState("login");
    const { isAuthenticated, setIsAuthenticated, theme, setTheme } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, navigate]);
    const [loginData, setLoginData] = useState({
        identifier: "",
        password: ""
    });
    
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: ""
    });
    
    useEffect(() => {
        const savedTheme =
            localStorage.getItem("theme") || "dark-purple";

        setTheme(savedTheme);
    }, [setTheme]);

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev =>
            prev === "dark-purple"
                ? "lavender"
                : "dark-purple"
        );
    };

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                password: loginData.password
            };

            if (loginData.identifier.includes("@")) {
                payload.email = loginData.identifier;
            } else {
                payload.username = loginData.identifier;
            }

            const response = await api.post(
                "/api/auth/login",
                payload,
                {
                    withCredentials: true
                }
            );
            
            toast.success(response.data.message);
            if (response.status === 200) {
                setIsAuthenticated(true);
                navigate("/dashboard");
            }
            // navigate("/dashboard")
        } catch (error) {
            
            if (error.response?.status === 403) {
                const userEmail = error.response?.data?.user?.email;
                await api.post(
                    "/api/auth/send-otp",
                    {
                        email: userEmail,
                        purpose: "register"
                    },
                    {
                        withCredentials: true
                    }
                )
                navigate("/verify-otp", {
                    state: {
                        email: userEmail
                    }
                });
            }
            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };
    const forgotPasswordTrigger = () => {
        navigate("/forgot-password");
    }
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post(
                "/api/auth/register",
                registerData,
                {
                    withCredentials: true
                }
            );

            const userEmail = response?.data?.user?.email;

            if (response.status === 201) {
                // await api.post(
                //     "/api/auth/send-otp",
                //     {
                //         email: userEmail,
                //         purpose: "register"
                //     },
                //     {
                //         withCredentials: true
                //     }
                // )
                // navigate("/verify-otp", {
                //     state: {
                //         email: userEmail,
                //         purpose: "register"
                //     }
                // });
                setIsAuthenticated(true);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Navbar */}
            <header>
                <div className="container nav-wrapper">
                    <div className="landing-logo"></div>

                    <div className="nav-right">
                        <button
                            className={`btn-theme ${theme === "dark-purple" ? "dark" : "light"}`}
                            id="themeToggle"
                            onClick={toggleTheme}
                        >
                            <span className="toggle-slider toggle-text">
                                {theme === "dark-purple" ? "🌙" : "☀️"}
                            </span>
                        </button>

                        <a
                            href="#authSection"
                            onClick={() => setActiveTab("login")}
                            className="btn btn-secondary"
                        >
                            Sign In
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <AnimatedSection className="hero" delay={0}>
                <div className="container">
                    <h1>
                        Track every rupee. Understand your spending.
                        Build better <span>financial habits</span>.
                    </h1>

                    <div className="hero-actions">
                        <a
                            href="#authSection"
                            className="btn btn-primary"
                            onClick={() => setActiveTab("register")}
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </AnimatedSection>
            {/* Intelligent Core Systems Section */}
            <section className="features">
                <div className="container">
                    <AnimatedSection className="section-title" delay={0}>
                        <h2 className="section-title">Intelligent Core Systems</h2>
                    </AnimatedSection>
                    <AnimatedSection className="section-subtitle" delay={0}>
                        <p className="section-subtitle">
                        Everything you need to map out your modern financial footprint.
                    </p>
                    </AnimatedSection>
                    
                    <div className="grid-4">
                        
                        <AnimatedSection className="feature-card" delay={0}>
                            <h3>Expense Tracking</h3>
                            <p>Log your outgoings dynamically with smart, immediate tags.</p>
                        </AnimatedSection>
                        <AnimatedSection className="feature-card" delay={150}>
                            <h3>Income Tracking</h3>
                            <p>Keep precise tallies of diverse revenue streams without messy tabs.</p>
                        </AnimatedSection>
                        <AnimatedSection className="feature-card" delay={300}>
                            <h3>Spending Analytics</h3>
                            <p>Understand complex micro-trends using beautiful algorithmic breakdowns.</p>
                        </AnimatedSection>
                        <AnimatedSection className="feature-card" delay={450}>
                            <h3>Category Insights</h3>
                            <p>Instantly know exactly how much budget goes into food, leisure, or rent.</p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            <section className="why-us">
                <div className="container">
                    <h2
                        className="section-title"
                        style={{ marginBottom: "50px" }}
                    >
                        Engineered Differently
                    </h2>

                    <div className="grid-2">

                        <AnimatedSection
                            className="why-item"
                            delay={0}
                        >
                            <div className="why-icon"></div>
                            <div>
                                <h3>Simple and intuitive UI</h3>
                                <p>
                                    Zero bloatware. Just smooth,
                                    minimalist visuals focused clean
                                    layout metrics.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection
                            className="why-item"
                            delay={150}
                        >
                            <div className="why-icon"></div>
                            <div>
                                <h3>Secure JWT Authentication</h3>
                                <p>
                                    State-of-the-art encrypted token
                                    safety barriers shield transactional
                                    tracking privacy data.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection
                            className="why-item"
                            delay={300}
                        >
                            <div className="why-icon"></div>
                            <div>
                                <h3>Real-time Overview</h3>
                                <p>
                                    Instantly responsive. Watch balances
                                    dynamically shift across structural
                                    data interfaces.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection
                            className="why-item"
                            delay={450}
                        >
                            <div className="why-icon"></div>
                            <div>
                                <h3>Students & Professionals</h3>
                                <p>
                                    Flexible parameter frameworks
                                    adjusting effortlessly to small
                                    personal budgets or robust active
                                    careers.
                                </p>
                            </div>
                        </AnimatedSection>

                    </div>
                </div>
            </section>
            {/* Auth Section */}
            <section
                className="auth-cta-section"
                id="authSection"
            >
                <div className="container">
                    <h2>Ready to take control?</h2>

                    <p
                        style={{
                            color: "var(--text-muted)"
                        }}
                    >
                        Create a free account or log back
                        into your dashboard below.
                    </p>

                    <div className="auth-container">

                        <div className="auth-tabs">
                            <button
                                className={`tab-btn ${
                                    activeTab === "login"
                                        ? "active"
                                        : ""
                                }`}
                                id="loginTab"
                                onClick={() =>
                                    setActiveTab("login")
                                }
                                disabled={loading}
                            >
                                Login
                            </button>

                            <button
                                className={`tab-btn ${
                                    activeTab === "register"
                                        ? "active"
                                        : ""
                                }`}
                                id="registerTab"
                                onClick={() =>
                                    setActiveTab("register")
                                }
                                disabled={loading}
                            >
                                Register
                            </button>
                        </div>

                        {/* Login Form */}
                        <form
                            id="loginForm"
                            className={`auth-form ${
                                activeTab === "login"
                                    ? "active"
                                    : ""
                            }`}
                            onSubmit={handleLoginSubmit}
                        >
                            <div className="input-group">
                                <label htmlFor="login-user">
                                    Username or Email
                                </label>

                                <input
                                    type="text"
                                    id="login-user"
                                    name="identifier"
                                    value={loginData.identifier}
                                    onChange={handleLoginChange}
                                    placeholder="Enter username or email"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="login-pass">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="login-pass"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            {/* <button type="button" disabled
                            className="forgot-password"
                            onClick={forgotPasswordTrigger}><p>Forgot Password? Use your local device to enable this feature</p></button> */}
                            <button
                                type="submit"
                                className="form-btn"
                                disabled={loading}
                            >
                                { loading? "Signing In..." : "Log In" }
                            </button>
                        </form>

                        {/* Register Form */}
                        <form
                            id="registerForm"
                            className={`auth-form ${
                                activeTab === "register"
                                    ? "active"
                                    : ""
                            }`}
                            onSubmit={handleRegisterSubmit}
                        >
                            <div className="input-group">
                                <label htmlFor="reg-username">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    id="reg-username"
                                    name="username"
                                    value={registerData.username}
                                    onChange={
                                        handleRegisterChange
                                    }
                                    placeholder="Choose a unique username"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="reg-email">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    id="reg-email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={
                                        handleRegisterChange
                                    }
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="reg-pass">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="reg-pass"
                                    name="password"
                                    value={registerData.password}
                                    onChange={
                                        handleRegisterChange
                                    }
                                    placeholder="Create strong password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="form-btn"
                                disabled={loading}
                            >
                                { loading? "Creating Account..." : "Create Account" }
                            </button>
                        </form>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Landing;