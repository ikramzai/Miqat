// DoctorDashboard.js
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import defaultUserImg from "../assets/default-user.png";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  // Redirect if not logged in or not a doctor
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (userType !== "doctor") {
      navigate("/patient");
      return;
    }
  }, [token, userType, navigate]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch doctor profile and appointments
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        setError("");

        // Get doctor profile
        const doctorRes = await api.get("/doctors/profile/me", config);
        setDoctor(doctorRes.data);

        // Get doctor's appointments
        const appointmentsRes = await api.get(
          `/appointments/doctor/${doctorRes.data._id}`,
          config
        );
        setAppointments(appointmentsRes.data);
      } catch (err) {
        console.error("❌ Error fetching doctor dashboard data:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
          navigate("/login");
        } else {
          setError("Failed to load dashboard data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token && userType === "doctor") {
      fetchDoctorData();
    }
  }, [token, userType, navigate]);

  // Listen for profile updates
  useEffect(() => {
    const handleProfileUpdate = (event) => {
      if (event.detail && event.detail.userData) {
        setDoctor(event.detail.userData);
      }
    };

    window.addEventListener("profile-updated", handleProfileUpdate);

    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, []);

  // Toggle availability
  const toggleAvailability = async () => {
    try {
      const updatedDoctor = {
        ...doctor,
        isAvailable: !doctor.isAvailable,
      };
      const res = await api.put(
        "/doctors/profile/me",
        { isAvailable: updatedDoctor.isAvailable },
        config
      );
      setDoctor(res.data);
    } catch (err) {
      console.error("❌ Failed to update availability:", err);
      setError("Failed to update availability. Please try again.");
    }
  };

  // Change appointment status
  const handleStatusChange = async (appointmentId, status) => {
    try {
      const res = await api.put(
        `/appointments/${appointmentId}/status`,
        { status },
        config
      );
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === appointmentId ? res.data : appt))
      );
    } catch (err) {
      console.error("❌ Failed to update appointment status:", err);
      setError("Failed to update appointment status. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/profile");
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading Doctor Dashboard...</p>
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

  if (!doctor) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          Doctor profile not found. Please log in again.
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mt-4"
      style={{ backgroundColor: "#f2f5ff", minHeight: "100vh" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-primary">Welcome, Dr. {doctor.name}</h2>
          <p className="text-muted mb-0">Specialty: {doctor.specialty}</p>
        </div>
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
                src={doctor.image ? doctor.image : defaultUserImg}
                alt={
                  doctor.name
                    ? `Profile of Dr. ${doctor.name}`
                    : "Doctor profile placeholder"
                }
                className="rounded-circle mb-3"
                width="100"
                height="100"
              />
              <h5 className="card-title">{doctor.name}</h5>
              <p className="card-text text-muted mb-1">{doctor.email}</p>
              <p className="card-text text-muted">{doctor.specialty}</p>
              {doctor.location && (
                <p className="card-text text-muted">{doctor.location}</p>
              )}
              {doctor.fees && (
                <p className="card-text text-muted">Fees: ${doctor.fees}</p>
              )}
              <button
                className="btn btn-primary mt-2"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="card-title text-primary mb-0">
                  Upcoming Appointments ({appointments.length})
                </h4>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="availabilitySwitch"
                    checked={doctor.isAvailable || false}
                    onChange={toggleAvailability}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="availabilitySwitch"
                  >
                    {doctor.isAvailable ? "Available" : "Unavailable"}
                  </label>
                </div>
              </div>

              {appointments.length === 0 ? (
                <p className="text-muted">No upcoming appointments.</p>
              ) : (
                <div className="list-group">
                  {appointments.map((appt) => (
                    <div key={appt._id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">
                            <strong>Patient:</strong>{" "}
                            {appt.patient?.name || "Unknown"}
                          </h6>
                          <p className="mb-1 text-muted">
                            <strong>Email:</strong>{" "}
                            {appt.patient?.email || "N/A"}
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
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() =>
                              handleStatusChange(appt._id, "confirmed")
                            }
                            disabled={appt.status === "confirmed"}
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleStatusChange(appt._id, "cancelled")
                            }
                            disabled={appt.status === "cancelled"}
                          >
                            Cancel
                          </button>
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

export default DoctorDashboard;
