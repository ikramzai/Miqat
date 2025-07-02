import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserMd,
  FaUser as FaPatient,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaCheckCircle,
  FaTimes,
  FaPhone,
  FaMapMarkerAlt,
  FaStethoscope,
} from "react-icons/fa";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "patient",
    specialty: "",
    agreeTerms: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const specialties = [
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Neurology",
    "Dentistry",
    "Orthopedics",
    "Ophthalmology",
    "Pathology",
    "Surgery",
    "Immunology",
    "Pulmonology",
    "Gynecology",
    "Urology",
    "Endocrinology",
    "Oncology",
    "ENT",
  ];

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!formData.agreeTerms) {
      return setError("You must agree to the terms.");
    }

    try {
      const endpoint =
        formData.userType === "doctor"
          ? "/doctors/register"
          : "/patients/register";

      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        ...(formData.userType === "doctor" && {
          specialty: formData.specialty || "General",
        }),
      };

      const response = await api.post(endpoint, payload);
      console.log("✅ Signup success:", response.data);
      navigate("/login", { state: { signupSuccess: true } });
    } catch (err) {
      console.error("❌ Signup failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "An error occurred during signup."
      );
    }
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    };
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(90deg, #4fd1c5 0%, #2563eb 100%)",
        padding: "2rem 0",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div
              className="card shadow-lg border-0"
              style={{ borderRadius: "20px", overflow: "hidden" }}
            >
              <div className="p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-primary mb-2">Create Account</h3>
                  <p className="text-muted">
                    Join our healthcare community today
                  </p>
                </div>

                {error && (
                  <div
                    className="alert alert-danger border-0 shadow-sm"
                    role="alert"
                    style={{ borderRadius: "10px" }}
                  >
                    <FaTimes className="me-2" />
                    {error}
                  </div>
                )}

                {success && (
                  <div
                    className="alert alert-success border-0 shadow-sm"
                    role="alert"
                    style={{ borderRadius: "10px" }}
                  >
                    <FaCheckCircle className="me-2" />
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* User Type Selection */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-muted">
                      I want to register as:
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
                        <FaPatient className="me-2" />
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

                  {/* Name Fields */}
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label
                        htmlFor="firstName"
                        className="form-label fw-semibold text-muted"
                      >
                        First Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <FaUser className="text-muted" />
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0"
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          required
                          style={{ borderRadius: "0 10px 10px 0" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="lastName"
                        className="form-label fw-semibold text-muted"
                      >
                        Last Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <FaUser className="text-muted" />
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0"
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          required
                          style={{ borderRadius: "0 10px 10px 0" }}
                        />
                      </div>
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
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaEnvelope className="text-muted" />
                      </span>
                      <input
                        type="email"
                        className="form-control border-start-0"
                        id="email"
                        placeholder="user@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        style={{ borderRadius: "0 10px 10px 0" }}
                      />
                    </div>
                  </div>

                  {/* Specialty Field for Doctors */}
                  {formData.userType === "doctor" && (
                    <div className="mb-4">
                      <label
                        htmlFor="specialty"
                        className="form-label fw-semibold text-muted"
                      >
                        Medical Specialty
                      </label>
                      <select
                        className="form-select"
                        id="specialty"
                        value={formData.specialty}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specialty: e.target.value,
                          })
                        }
                        required
                        style={{ borderRadius: "10px" }}
                      >
                        <option value="">Select your specialty</option>
                        {specialties.map((specialty, index) => (
                          <option key={index} value={specialty}>
                            {specialty}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Password Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold text-muted"
                    >
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control border-start-0 border-end-0"
                        id="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
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

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="d-flex gap-1 mb-2">
                          {Object.values(passwordValidation).map(
                            (isValid, index) => (
                              <div
                                key={index}
                                className={`flex-fill rounded-pill ${
                                  isValid ? "bg-success" : "bg-secondary"
                                }`}
                                style={{ height: "4px" }}
                              ></div>
                            )
                          )}
                        </div>
                        <small className="text-muted">
                          Password strength:{" "}
                          {Object.values(passwordValidation).filter(Boolean)
                            .length === 5
                            ? "Strong"
                            : Object.values(passwordValidation).filter(Boolean)
                                .length >= 3
                            ? "Medium"
                            : "Weak"}
                        </small>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label fw-semibold text-muted"
                    >
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control border-start-0 border-end-0"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                      <button
                        type="button"
                        className="input-group-text bg-light border-start-0"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{ borderRadius: "0 10px 10px 0" }}
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash className="text-muted" />
                        ) : (
                          <FaEye className="text-muted" />
                        )}
                      </button>
                    </div>
                    {formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <small className="text-danger">
                          Passwords do not match
                        </small>
                      )}
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            agreeTerms: e.target.checked,
                          })
                        }
                        required
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor="agreeTerms"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-primary text-decoration-none"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-primary text-decoration-none"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>

                  {/* Sign Up Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 mb-4 fw-semibold"
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
                    Create Account
                  </button>

                  {/* Divider */}
                  <div className="text-center mb-4">
                    <span
                      className="bg-white px-3 text-muted"
                      style={{ fontSize: "0.9rem" }}
                    >
                      or sign up with
                    </span>
                    <hr className="mt-n3" />
                  </div>

                  {/* Social Signup Buttons */}
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

                  {/* Login Link */}
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-decoration-none fw-semibold"
                        style={{ color: "#2a7de1" }}
                      >
                        Sign in here
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

export default SignupPage;
