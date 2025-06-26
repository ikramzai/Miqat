import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import doctorImage from "../assets/doctor-appointment.jpg";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "patient",
    agreeTerms: false,
  });

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
          <div className="w-100 p-4" style={{ maxWidth: "450px" }}>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="text-center mb-4">
                <h2 className="h3 fw-bold" style={{ color: "#2a7de1" }}>
                  Create Account
                </h2>
                <p className="text-muted">Join our healthcare network</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
