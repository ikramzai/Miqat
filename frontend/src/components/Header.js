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
import { getImageUrl, handleImageError } from "../utils/imageUtils";
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
  const mobileMenuRef = useRef(null);
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

    const handleRefreshImages = () => {
      // Force re-render by updating state
      setUserData((prevData) => ({ ...prevData }));
    };

    window.addEventListener("user-login", handleUserLogin);
    window.addEventListener("refresh-images", handleRefreshImages);

    return () => {
      window.removeEventListener("user-login", handleUserLogin);
      window.removeEventListener("refresh-images", handleRefreshImages);
    };
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

        {/* Desktop Navigation */}
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

        {/* Desktop User Section */}
        <div className="d-none d-lg-flex align-items-center gap-3 ms-3 position-relative">
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
                  src={getImageUrl(userData?.profilePicture)}
                  alt="Profile"
                  className="rounded-circle"
                  width="32"
                  height="32"
                  style={{ objectFit: "cover", border: "1px solid #e3eafc" }}
                  onError={handleImageError}
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
                    minWidth: "200px",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2 py-2"
                      onClick={handleDashboard}
                    >
                      <MdDashboard size={18} />
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2 py-2"
                      onClick={handleAppointments}
                    >
                      <FaCalendarAlt size={16} />
                      Appointments
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2 py-2"
                      onClick={handleProfile}
                    >
                      <FaUser size={16} />
                      Profile
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt size={16} />
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link
                to="/login"
                className="btn btn-gradient px-3 py-2 fw-semibold"
                style={{ borderRadius: "12px" }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-gradient px-3 py-2 fw-semibold"
                style={{ borderRadius: "12px" }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="d-lg-none">
          <button
            className="btn btn-link p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            style={{ fontSize: "1.5rem", color: "#2563eb" }}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="d-lg-none"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            borderTop: "1px solid #e3eafc",
            zIndex: 1001,
          }}
        >
          <div className="container py-3">
            {/* Mobile Navigation Links */}
            <div className="mb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`d-block py-3 px-3 rounded fw-semibold text-decoration-none ${
                    location.pathname === link.to ? "active" : ""
                  }`}
                  style={{
                    color: location.pathname === link.to ? "#2563eb" : "#333",
                    background:
                      location.pathname === link.to ? "#eaf2ff" : "transparent",
                    marginBottom: "0.5rem",
                    borderRadius: "12px",
                    fontSize: "1.1rem",
                    transition: "all 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile User Section */}
            {isLoggedIn ? (
              <div className="border-top pt-3">
                {/* Notifications */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="fw-semibold text-muted">Notifications</span>
                  <button
                    className="btn btn-link p-2 position-relative"
                    onClick={() => setShowNotifications((prev) => !prev)}
                    aria-label="Show notifications"
                  >
                    <FaBell size={20} color="#2563eb" />
                    {unreadCount > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          background: "#e53e3e",
                          color: "#fff",
                          borderRadius: "50%",
                          fontSize: 10,
                          minWidth: 16,
                          height: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                        }}
                      >
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* User Profile */}
                <div
                  className="d-flex align-items-center gap-3 mb-3 p-3 rounded"
                  style={{ background: "#f8faff" }}
                >
                  <img
                    src={getImageUrl(userData?.profilePicture)}
                    alt="Profile"
                    className="rounded-circle"
                    width="48"
                    height="48"
                    style={{ objectFit: "cover", border: "2px solid #e3eafc" }}
                    onError={handleImageError}
                  />
                  <div>
                    <div className="fw-bold">{userData?.name || "User"}</div>
                    <small className="text-muted">{userType}</small>
                  </div>
                </div>

                {/* Mobile Menu Items */}
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-outline-primary d-flex align-items-center gap-2 py-3"
                    onClick={handleDashboard}
                    style={{ borderRadius: "12px" }}
                  >
                    <MdDashboard size={18} />
                    Dashboard
                  </button>
                  <button
                    className="btn btn-outline-primary d-flex align-items-center gap-2 py-3"
                    onClick={handleAppointments}
                    style={{ borderRadius: "12px" }}
                  >
                    <FaCalendarAlt size={16} />
                    Appointments
                  </button>
                  <button
                    className="btn btn-outline-primary d-flex align-items-center gap-2 py-3"
                    onClick={handleProfile}
                    style={{ borderRadius: "12px" }}
                  >
                    <FaUser size={16} />
                    Profile
                  </button>
                  <button
                    className="btn btn-outline-danger d-flex align-items-center gap-2 py-3"
                    onClick={handleLogout}
                    style={{ borderRadius: "12px" }}
                  >
                    <FaSignOutAlt size={16} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-grid gap-2 mt-3">
                <Link
                  to="/login"
                  className="btn btn-gradient py-3 fw-semibold"
                  style={{ borderRadius: "12px" }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-gradient py-3 fw-semibold"
                  style={{ borderRadius: "12px" }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
