// PatientDashboard.js
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaEdit,
  FaSave,
  FaTimes,
  FaPlus,
  FaSearch,
  FaStethoscope,
} from "react-icons/fa";
import defaultUserImg from "../assets/default-user.png";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  // Redirect if not logged in or not a patient
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (userType !== "patient") {
      navigate("/doctor");
      return;
    }
  }, [token, userType, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Get patient profile
        const profileRes = await api.get("/patients/profile/me", config);
        setUser(profileRes.data);

        // Get patient's appointments
        const appointmentRes = await api.get(
          "/appointments/patient/me",
          config
        );
        setAppointments(appointmentRes.data);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
          localStorage.removeItem("userData");
          navigate("/login");
        } else {
          setError("Failed to load dashboard data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token && userType === "patient") {
    fetchData();
    }
  }, [token, userType, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.put(
        `/appointments/${appointmentId}/status`,
        { status: "cancelled" },
        config
      );

      // Update local state
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: "cancelled" } : appt
        )
      );
    } catch (err) {
      console.error("Failed to cancel appointment:", err);
      setError("Failed to cancel appointment. Please try again.");
    }
  };

  const handleEditProfile = () => {
    navigate('/profile');
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading Patient Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          Patient profile not found. Please log in again.
        </div>
      </div>
    );
  }

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: "#f2f5ff", minHeight: "100vh" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Welcome, {user?.name}!</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <span className="visually-hidden">Logout</span>
          <span aria-hidden="true">Logout</span>
        </button>
      </div>

      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <img
                src={
                  user?.profilePicture
                    ? `${
                        process.env.REACT_APP_API_BASE_URL ||
                        "http://localhost:5000"
                      }${user.profilePicture}`
                    : defaultUserImg
                }
                alt={
                  user?.name
                    ? `Profile of ${user.name}`
                    : "Patient profile placeholder"
                }
                className="rounded-circle mb-3"
                width="100"
                height="100"
              />
              <h5 className="card-title">{user?.name}</h5>
              <p className="card-text text-muted mb-1">{user?.email}</p>
              <p className="card-text text-muted">{user?.phone || "N/A"}</p>
              <button className="btn btn-primary mt-2" onClick={handleEditProfile}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-4 text-primary">
                Upcoming Appointments
              </h4>
              {appointments.length === 0 ? (
                <p className="text-muted">No upcoming appointments.</p>
              ) : (
                <div className="list-group">
                  {appointments.map((appt) => (
                    <div key={appt._id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">
                            <strong>Doctor:</strong>{" "}
                            {appt.doctor?.name || "Unknown"}
                          </h6>
                          <p className="mb-1 text-muted">
                            <strong>Specialty:</strong>{" "}
                            {appt.doctor?.specialty || "N/A"}
                          </p>
                          <small className="text-muted">
                            <strong>Date:</strong>{" "}
                            {new Date(appt.date).toLocaleDateString()} |{" "}
                            <strong>Time:</strong> {appt.time}
                          </small>
                          <br />
                          <span
                            className={`badge ${
                              appt.status === "confirmed"
                                ? "bg-success"
                                : appt.status === "cancelled"
                                ? "bg-danger"
                                : "bg-warning"
                            }`}
                          >
                            {appt.status.charAt(0).toUpperCase() +
                              appt.status.slice(1)}
                          </span>
                        </div>
                        <div>
                          {appt.status === "pending" && (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleCancelAppointment(appt._id)}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
