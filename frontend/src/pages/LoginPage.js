import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import doctorImage from "../assets/doctor-appointment.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "patient", // default is patient
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        formData.userType === "doctor"
          ? "http://localhost:5000/api/doctors/login"
          : "http://localhost:5000/api/patients/login";

      const res = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");

      localStorage.setItem("userType", formData.userType);

      // Redirect to dashboard
      if (formData.userType === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="container-fluid vh-100 g-0">
      <div className="row h-100 g-0">
        <div className="col-lg-6 d-none d-lg-flex">
          <img
            src={doctorImage}
            alt="Doctor Login"
            className="h-100 w-100 object-fit-cover"
          />
        </div>

        <div
          className="col-lg-6 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#f2f5ff" }}
        >
          <form onSubmit={handleLogin} className="w-100 p-4" style={{ maxWidth: "450px" }}>
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="text-center mb-4">
                <h2 className="h3 fw-bold" style={{ color: "#2a7de1" }}>
                  Log In
                </h2>
                <p className="text-muted">Welcome back</p>
              </div>

              <div className="mb-3">
                <label htmlFor="userType" className="form-label">I am a:</label>
                <select
                  className="form-select py-2"
                  id="userType"
                  value={formData.userType}
                  onChange={(e) =>
                    setFormData({ ...formData, userType: e.target.value })
                  }
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
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
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control py-2"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn w-100 py-2 mb-3 text-white"
                style={{ backgroundColor: "#2a7de1" }}
              >
                Log In
              </button>

              <div className="text-center">
                <p className="text-muted mb-0">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-decoration-none fw-bold" style={{ color: "#2a7de1" }}>
                    Sign up
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

export default LoginPage;
