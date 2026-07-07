import logo from "./FinTrack-Logo.png";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../Utils/api';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function Navbar() {
  const [theme, setTheme] = useState("dark-purple");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
      const savedTheme =
          localStorage.getItem("theme") || "dark-purple";

      setTheme(savedTheme);
  }, []);

  useEffect(() => {
      document.documentElement.setAttribute(
          "data-theme",
          theme
      );

      localStorage.setItem("theme", theme);
  }, [theme]);

  const redirectSettings = () => {
    navigate("/settings");
  }
  const toggleTheme = () => {
      setTheme(prev =>
          prev === "dark-purple"
              ? "lavender"
              : "dark-purple"
      );
  };
  const logOut = async () => {
    try {
      await api.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      navigate("/"); // landing page
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };
  return (
    <nav className="navbar">
      <div className="elements">

        <div className="logo">
          <img src={logo} alt="FinTrack Logo" className="logo" />
        </div>
        
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Transactions
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Analytics
        </NavLink>

        <div className="nav-right">
          <i className="fa-solid fa-circle-user profile-icon"></i>
          <div className="profile-floater">
            <button
            onClick={redirectSettings}
            >
              Settings
            </button>
            <button
            onClick={toggleTheme}
            >
              Change Theme
            </button>
            <button
            onClick={logOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;