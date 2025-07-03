import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHeartbeat,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaEnvelope,
  FaStethoscope,
  FaChevronDown,
  FaUser,
  FaCalendarAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import {
  MdMedicalServices,
  MdPersonSearch,
  MdInfo,
  MdDashboard,
} from "react-icons/md";
import defaultUserImg from "../assets/default-user.png";
import Notifications from "./Notifications";
import { fetchNotifications, markNotificationAsRead } from "../services/api";

const gradientStyle = {
  background: "linear-gradient(90deg, #4fd1c5 0%, #2563eb 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  fontWeight: 800,
  fontSize: "2.2rem",
  letterSpacing: 2,
  display: "inline-block",
};

const navLinks = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/search",
    label: "Find a Doctor",
  },
];

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userData, setUserData] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const primaryColor = "#2a7de1";
  const white = "#ffffff";
  const textDark = "#333333";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userTypeFromStorage = localStorage.getItem("userType");
    const userDataFromStorage = localStorage.getItem("userData");

    if (token && userTypeFromStorage) {
      setIsLoggedIn(true);
      setUserType(userTypeFromStorage);
      if (userDataFromStorage) {
        setUserData(JSON.parse(userDataFromStorage));
      }
    }

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for storage changes (login/logout in other tabs or after login)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const userTypeFromStorage = localStorage.getItem("userType");
      const userDataFromStorage = localStorage.getItem("userData");

      if (token && userTypeFromStorage) {
        setIsLoggedIn(true);
        setUserType(userTypeFromStorage);
        if (userDataFromStorage) {
          setUserData(JSON.parse(userDataFromStorage));
        }
      } else {
        setIsLoggedIn(false);
        setUserType("");
        setUserData(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowDropdown(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  useEffect(() => {
    const handleUserLogout = () => {
      setIsLoggedIn(false);
      setUserType("");
      setUserData(null);
    };
    window.addEventListener("user-logout", handleUserLogout);
    return () => window.removeEventListener("user-logout", handleUserLogout);
  }, []);

  // Fetch notifications when user logs in
  useEffect(() => {
    const loadNotifications = async () => {
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem("token");
          const data = await fetchNotifications(token);
          const unread = data.filter((n) => !n.read).length;
          setUnreadCount(unread);
        } catch (err) {
          console.error("Failed to load notifications:", err);
        }
      } else {
        setUnreadCount(0);
      }
    };
    loadNotifications();
  }, [isLoggedIn]);

  // Close notifications dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  useEffect(() => {
    const handleUserLogin = () => {
      const token = localStorage.getItem("token");
      const userTypeFromStorage = localStorage.getItem("userType");
      const userDataFromStorage = localStorage.getItem("userData");

      if (token && userTypeFromStorage) {
        setIsLoggedIn(true);
        setUserType(userTypeFromStorage);
        if (userDataFromStorage) {
          setUserData(JSON.parse(userDataFromStorage));
        }
      }
    };
    window.addEventListener("user-login", handleUserLogin);
    return () => window.removeEventListener("user-login", handleUserLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserType("");
    setUserData(null);
    window.dispatchEvent(new Event("user-logout"));
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleDashboard = () => {
    if (userType === "doctor") navigate("/doctor");
    else navigate("/patient");
  };

  const handleAppointments = () => {
    navigate("/appointments");
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await markNotificationAsRead(id, token);
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  return (
    <header
      className="navbar navbar-expand-lg navbar-light shadow-sm py-2"
      style={{
        minHeight: 80,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#fff",
        boxShadow: isScrolled
          ? "0 2px 16px rgba(42,125,225,0.10)"
          : "0 1px 4px rgba(42,125,225,0.04)",
        transition: "box-shadow 0.2s",
        borderBottom: "1.5px solid #f0f4fa",
      }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center"
          style={{ gap: 14 }}
        >
          <FaStethoscope
            size={38}
            style={{
              background: "linear-gradient(90deg, #4fd1c5 0%, #2563eb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "#2a7de1",
              display: "inline-block",
            }}
          />
          <span style={gradientStyle}>MIQAT</span>
        </Link>
        {/* Spacer to push nav links to the right */}
        <div style={{ flex: 1 }} />
        {/* Nav Links */}
        <nav
          className="d-none d-lg-flex align-items-center gap-4"
          style={{ marginRight: 24 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`fw-semibold px-4 py-2 rounded nav-link${
                location.pathname === link.to ? " active" : ""
              }`}
              style={{
                color: location.pathname === link.to ? "#2563eb" : "#222",
                background:
                  location.pathname === link.to ? "#eaf2ff" : "transparent",
                fontWeight: 700,
                fontSize: "1.13rem",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                borderRadius: 14,
                boxShadow:
                  location.pathname === link.to
                    ? "0 2px 8px rgba(42,125,225,0.08)"
                    : "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* User Dropdown or Auth Buttons */}
        <div className="d-flex align-items-center gap-3 ms-3 position-relative">
          {isLoggedIn && (
            <div style={{ position: "relative" }} ref={notificationsRef}>
              <button
                className="btn btn-link p-0"
                style={{ position: "relative" }}
                onClick={() => setShowNotifications((prev) => !prev)}
                aria-label="Show notifications"
              >
                <FaBell size={24} color="#2563eb" />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      background: "#e53e3e",
                      color: "#fff",
                      borderRadius: "50%",
                      fontSize: 12,
                      minWidth: 18,
                      height: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 5px",
                      fontWeight: 700,
                      boxShadow: "0 1px 4px rgba(229,62,62,0.15)",
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 36,
                    zIndex: 2000,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(42,125,225,0.12)",
                    borderRadius: 12,
                    minWidth: 320,
                  }}
                >
                  <Notifications
                    token={localStorage.getItem("token")}
                    onUnreadCount={setUnreadCount}
                    onMarkAsRead={handleMarkAsRead}
                  />
                </div>
              )}
            </div>
          )}
          {isLoggedIn ? (
            <div className="dropdown" ref={dropdownRef}>
              <button
                className="btn btn-light d-flex align-items-center gap-2 px-3 py-2 fw-bold border rounded-pill shadow-sm"
                style={{
                  fontSize: "1.05rem",
                  border: "1.5px solid #e3eafc",
                  boxShadow: "0 2px 8px rgba(42,125,225,0.08)",
                }}
                onClick={() => setShowDropdown((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={showDropdown}
                id="userDropdown"
              >
                <img
                  src={
                    userData?.profilePicture
                      ? `${
                          process.env.REACT_APP_API_BASE_URL ||
                          "http://localhost:5000"
                        }${userData.profilePicture}`
                      : defaultUserImg
                  }
                  alt="Profile"
                  className="rounded-circle"
                  width="32"
                  height="32"
                  style={{ objectFit: "cover", border: "1px solid #e3eafc" }}
                />
                <span className="d-none d-md-inline">
                  {userData?.name?.split(" ")[0] || "Account"}
                </span>
                <FaChevronDown size={16} />
              </button>
              {showDropdown && (
                <ul
                  className="dropdown-menu show mt-2 shadow"
                  style={{
                    right: 0,
                    left: "auto",
                    minWidth: 220,
                    borderRadius: 16,
                    boxShadow: "0 4px 24px rgba(42,125,225,0.10)",
                    padding: 0,
                    border: "1px solid #e3eafc",
                    background: "#fff",
                    overflow: "hidden",
                  }}
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      style={{
                        padding: "14px 20px",
                        fontWeight: 600,
                        fontSize: 15,
                        borderBottom: "1px solid #f0f4fa",
                        background: "none",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#eaf2ff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "none")
                      }
                      onClick={handleProfile}
                    >
                      <FaUser /> Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      style={{
                        padding: "14px 20px",
                        fontWeight: 600,
                        fontSize: 15,
                        borderBottom: "1px solid #f0f4fa",
                        background: "none",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#eaf2ff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "none")
                      }
                      onClick={handleDashboard}
                    >
                      <FaTachometerAlt /> Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      style={{
                        padding: "14px 20px",
                        fontWeight: 600,
                        fontSize: 15,
                        borderBottom: "1px solid #f0f4fa",
                        background: "none",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#eaf2ff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "none")
                      }
                      onClick={handleAppointments}
                    >
                      <FaCalendarAlt /> Appointments
                    </button>
                  </li>
                  <li>
                    <hr
                      className="dropdown-divider"
                      style={{ margin: 0, borderColor: "#e3eafc" }}
                    />
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2 text-danger"
                      style={{
                        padding: "14px 20px",
                        fontWeight: 600,
                        fontSize: 15,
                        background: "none",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#ffeaea")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "none")
                      }
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn px-4 py-2 fw-bold"
                style={{
                  borderRadius: 30,
                  fontSize: "1.05rem",
                  border: "1.5px solid #2563eb",
                  color: "#2563eb",
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(42,125,225,0.06)",
                  marginRight: 4,
                  fontWeight: 700,
                  transition: "all 0.2s",
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn px-4 py-2 fw-bold"
                style={{
                  borderRadius: 30,
                  fontSize: "1.05rem",
                  background:
                    "linear-gradient(90deg, #2563eb 0%, #4fd1c5 100%)",
                  color: "#fff",
                  border: "none",
                  boxShadow: "0 4px 16px rgba(42,125,225,0.10)",
                  fontWeight: 700,
                  transition: "all 0.2s",
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
