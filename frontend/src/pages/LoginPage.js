import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUserMd,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [signupSuccess, setSignupSuccess] = useState(
    location.state?.signupSuccess || false
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "patient",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        formData.userType === "doctor"
          ? "http://localhost:5000/api/doctors/login"
          : "http://localhost:5000/api/patients/login";

      const res = await axios.post(endpoint, {
        email: formData.email.trim(),
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", formData.userType);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          ...(res.data.specialty && { specialty: res.data.specialty }),
        })
      );

      window.dispatchEvent(new Event("user-login"));

      if (formData.userType === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (err.response?.status === 404) {
        setError("User not found. Please check your email or sign up.");
      } else if (err.code === "NETWORK_ERROR") {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError(
          err.response?.data?.message || "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem 0",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div
              className="card shadow-lg border-0"
              style={{ borderRadius: "20px", overflow: "hidden" }}
            >
              <div className="p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-primary mb-2">Sign In</h3>
                  <p className="text-muted">
                    Welcome back! Please sign in to your account
                  </p>
                  {signupSuccess && (
                    <div
                      className="alert alert-success border-0 shadow-sm"
                      role="alert"
                      style={{ borderRadius: "10px" }}
                    >
                      Account created successfully! Please log in.
                    </div>
                  )}
                </div>

                {error && (
                  <div
                    className="alert alert-danger border-0 shadow-sm"
                    role="alert"
                    style={{ borderRadius: "10px" }}
                  >
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  {/* User Type Selection */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-muted">
                      I am a:
                    </label>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className={`flex-fill btn ${
                          formData.userType === "patient"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        } py-3 rounded-pill`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            userType: "patient",
                          }))
                        }
                        style={{ transition: "all 0.3s ease" }}
                      >
                        <FaUser className="me-2" />
                        Patient
                      </button>
                      <button
                        type="button"
                        className={`flex-fill btn ${
                          formData.userType === "doctor"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        } py-3 rounded-pill`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            userType: "doctor",
                          }))
                        }
                        style={{ transition: "all 0.3s ease" }}
                      >
                        <FaUserMd className="me-2" />
                        Doctor
                      </button>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="form-label fw-semibold text-muted"
                    >
                      Email Address
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light border-end-0">
                        <FaEnvelope className="text-muted" />
                      </span>
                      <input
                        type="email"
                        className="form-control border-start-0 ps-0"
                        id="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        disabled={loading}
                        style={{ borderRadius: "0 10px 10px 0" }}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold text-muted"
                    >
                      Password
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control border-start-0 border-end-0 ps-0"
                        id="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        className="input-group-text bg-light border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ borderRadius: "0 10px 10px 0" }}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-muted" />
                        ) : (
                          <FaEye className="text-muted" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 mb-4 fw-semibold"
                    disabled={loading}
                    style={{
                      borderRadius: "10px",
                      fontSize: "1.1rem",
                      background: "linear-gradient(45deg, #2a7de1, #1e88e5)",
                      border: "none",
                      boxShadow: "0 4px 15px rgba(42, 125, 225, 0.3)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 6px 20px rgba(42, 125, 225, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 15px rgba(42, 125, 225, 0.3)";
                    }}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* Divider */}
                  <div className="text-center mb-4">
                    <span
                      className="bg-white px-3 text-muted"
                      style={{ fontSize: "0.9rem" }}
                    >
                      or continue with
                    </span>
                    <hr className="mt-n3" />
                  </div>

                  {/* Social Login Buttons */}
                  <div className="row g-2 mb-4">
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-100 py-2"
                        style={{ borderRadius: "10px" }}
                      >
                        <FaGoogle className="me-2" />
                        Google
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-100 py-2"
                        style={{ borderRadius: "10px" }}
                      >
                        <FaFacebook className="me-2" />
                        Facebook
                      </button>
                    </div>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-decoration-none fw-semibold"
                        style={{ color: "#2a7de1" }}
                      >
                        Sign up here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
