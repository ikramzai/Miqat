import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import doctorImage from "../assets/doctor-appointment.jpg";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "patient", // or 'doctor'
    specialty: "", // only for doctors
    agreeTerms: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
          ? "/api/doctors/register"
          : "/api/patients/register";

      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        ...(formData.userType === "doctor" && {
          specialty: formData.specialty || "General",
        }),
      };

      const response = await axios.post(endpoint, payload);
      setSuccess("Account created successfully!");
      console.log("✅ Signup success:", response.data);
    } catch (err) {
      console.error("❌ Signup failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "An error occurred during signup."
      );
    }
  };

  return (
    <div className="container-fluid vh-100 g-0">
      <div className="row h-100 g-0">
        {/* Left Side - Medical Image */}
        <div className="col-lg-6 d-none d-lg-flex">
          <img
            src={doctorImage}
            alt="Doctor Appointment"
            className="h-100 w-100 object-fit-cover"
          />
        </div>

        {/* Right Side - Signup Form */}
        <div
          className="col-lg-6 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#f2f5ff" }}
        >
          <form
            onSubmit={handleSubmit}
            className="w-100 p-4"
            style={{ maxWidth: "450px" }}
          >
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="text-center mb-4">
                <h2 className="h3 fw-bold" style={{ color: "#2a7de1" }}>
                  Create Account
                </h2>
                <p className="text-muted">Join our healthcare network</p>
              </div>

              {/* User Type Toggle */}
              <div className="mb-3">
                <label className="form-label">Register as:</label>
                <select
                  className="form-select"
                  value={formData.userType}
                  onChange={(e) =>
                    setFormData({ ...formData, userType: e.target.value })
                  }
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control py-2"
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control py-2"
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control py-2"
                  id="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              {/* Specialty Field for Doctors */}
              {formData.userType === "doctor" && (
                <div className="mb-3">
                  <label htmlFor="specialty" className="form-label">
                    Specialty
                  </label>
                  <input
                    type="text"
                    className="form-control py-2"
                    id="specialty"
                    placeholder="e.g. Cardiologist"
                    value={formData.specialty}
                    onChange={(e) =>
                      setFormData({ ...formData, specialty: e.target.value })
                    }
                    required
                  />
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control py-2"
                  id="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control py-2"
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeTerms: e.target.checked })
                  }
                  required
                />
                <label className="form-check-label" htmlFor="agreeTerms">
                  I agree to the{" "}
                  <a href="/terms" style={{ color: "#2a7de1" }}>
                    Terms
                  </a>
                </label>
              </div>

              {/* Error & Success Messages */}
              {error && (
                <div className="alert alert-danger py-2">{error}</div>
              )}
              {success && (
                <div className="alert alert-success py-2">{success}</div>
              )}

              <button
                type="submit"
                className="btn w-100 py-2 mb-3 text-white"
                style={{ backgroundColor: "#2a7de1" }}
              >
                Create Account
              </button>

              <div className="d-flex align-items-center mb-3">
                <hr className="flex-grow-1" />
                <span className="px-3 text-muted">or</span>
                <hr className="flex-grow-1" />
              </div>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 py-2 mb-3"
              >
                <FcGoogle className="me-2 mb-1" /> Continue with Google
              </button>

              <div className="text-center">
                <p className="text-muted mb-0">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-decoration-none fw-bold"
                    style={{ color: "#2a7de1" }}
                  >
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
