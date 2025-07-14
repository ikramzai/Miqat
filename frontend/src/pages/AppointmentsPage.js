import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaTimes,
  FaEdit,
  FaTrash,
  FaFilter,
  FaList,
  FaCalendar,
  FaEye,
} from "react-icons/fa";

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    doctor: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchAppointments();
  }, [token, navigate]);

  // Listen for profile updates and re-fetch appointments
  useEffect(() => {
    const handleProfileUpdate = () => {
      fetchAppointments();
    };
    window.addEventListener("profile-updated", handleProfileUpdate);
    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const endpoint =
        userType === "doctor"
          ? "/appointments/doctor/me"
          : "/appointments/patient/me";

      const response = await api.get(endpoint, config);
      setAppointments(response.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/login");
      } else {
        setError("Failed to load appointments. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.put(
        `/appointments/${appointmentId}/status`,
        { status: newStatus },
        config
      );

      // Update local state
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (err) {
      console.error("Error updating appointment status:", err);
      setError("Failed to update appointment status. Please try again.");
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      await handleStatusChange(appointmentId, "cancelled");
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await api.delete(`/appointments/${appointmentId}`, config);

        // Remove from local state
        setAppointments((prev) =>
          prev.filter((appt) => appt._id !== appointmentId)
        );
      } catch (err) {
        console.error("Error deleting appointment:", err);
        setError("Failed to delete appointment. Please try again.");
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "bg-warning", text: "Pending" },
      confirmed: { class: "bg-success", text: "Confirmed" },
      cancelled: { class: "bg-danger", text: "Cancelled" },
      completed: { class: "bg-info", text: "Completed" },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filters.status && appointment.status !== filters.status) return false;
    if (filters.date && appointment.date !== filters.date) return false;
    if (
      filters.doctor &&
      !appointment.doctor?.name
        ?.toLowerCase()
        .includes(filters.doctor.toLowerCase())
    )
      return false;
    return true;
  });

  const upcomingAppointments = filteredAppointments.filter(
    (appt) => new Date(appt.date) >= new Date() && appt.status !== "cancelled"
  );

  const pastAppointments = filteredAppointments.filter(
    (appt) => new Date(appt.date) < new Date() || appt.status === "cancelled"
  );

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading appointments...</p>
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

  return (
    <div
      className="container mt-4"
      style={{ backgroundColor: "#f2f5ff", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-primary mb-0">My Appointments</h2>
                <div className="d-flex gap-2">
                  <button
                    className={`btn btn-outline-primary ${
                      viewMode === "list" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <FaList className="me-1" />
                    List View
                  </button>
                  <button
                    className={`btn btn-outline-primary ${
                      viewMode === "calendar" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("calendar")}
                    aria-label="Calendar view"
                  >
                    <FaCalendar className="me-1" />
                    Calendar View
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="row g-3">
                <div className="col-md-3">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <FaFilter className="me-1" />
                    Filters
                  </button>
                </div>
                {showFilters && (
                  <>
                    <div className="col-md-3">
                      <select
                        className="form-select"
                        value={filters.status}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                      >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <input
                        type="date"
                        className="form-control"
                        value={filters.date}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={
                          userType === "doctor"
                            ? "Search patient..."
                            : "Search doctor..."
                        }
                        value={filters.doctor}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            doctor: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Upcoming Appointments */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header">
              <h4 className="text-success mb-0">
                <FaCalendarAlt className="me-2" />
                Upcoming Appointments ({upcomingAppointments.length})
              </h4>
            </div>
            <div className="card-body">
              {upcomingAppointments.length === 0 ? (
                <p className="text-muted text-center py-3">
                  No upcoming appointments.
                </p>
              ) : (
                <div className="row g-3">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment._id} className="col-12">
                      <div className="card border-success">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-md-3">
                              <div className="d-flex align-items-center">
                                <img
                                  src={
                                    userType === "doctor"
                                      ? appointment.patient?.image ||
                                        "https://via.placeholder.com/50"
                                      : appointment.doctor?.image ||
                                        "https://via.placeholder.com/50"
                                  }
                                  alt="Profile"
                                  className="rounded-circle me-3"
                                  width="50"
                                  height="50"
                                />
                                <div>
                                  <h6 className="mb-0">
                                    {userType === "doctor"
                                      ? appointment.patient?.name
                                      : appointment.doctor?.name}
                                  </h6>
                                  <small className="text-muted">
                                    {userType === "doctor"
                                      ? "Patient"
                                      : appointment.doctor?.specialty}
                                  </small>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div>
                                <FaCalendarAlt className="me-1 text-muted" />
                                <span>
                                  {new Date(
                                    appointment.date
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div>
                                <FaClock className="me-1 text-muted" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                            <div className="col-md-2">
                              {getStatusBadge(appointment.status)}
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex gap-2">
                                {userType === "doctor" &&
                                  appointment.status === "pending" && (
                                    <>
                                      <button
                                        className="btn btn-success btn-sm"
                                        onClick={() =>
                                          handleStatusChange(
                                            appointment._id,
                                            "confirmed"
                                          )
                                        }
                                      >
                                        <FaCheckCircle className="me-1" />
                                        Confirm
                                      </button>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                          handleStatusChange(
                                            appointment._id,
                                            "cancelled"
                                          )
                                        }
                                      >
                                        <FaTimes className="me-1" />
                                        Decline
                                      </button>
                                    </>
                                  )}
                                {userType === "patient" &&
                                  appointment.status === "pending" && (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() =>
                                        handleCancelAppointment(appointment._id)
                                      }
                                    >
                                      <FaTimes className="me-1" />
                                      Cancel
                                    </button>
                                  )}
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() =>
                                    navigate(`/appointments/${appointment._id}`)
                                  }
                                >
                                  <FaEye className="me-1" />
                                  View
                                </button>
                              </div>
                            </div>
                          </div>
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

      {/* Past Appointments */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header">
              <h4 className="text-muted mb-0">
                <FaCalendarAlt className="me-2" />
                Past Appointments ({pastAppointments.length})
              </h4>
            </div>
            <div className="card-body">
              {pastAppointments.length === 0 ? (
                <p className="text-muted text-center py-3">
                  No past appointments.
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>{userType === "doctor" ? "Patient" : "Doctor"}</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastAppointments.map((appointment) => (
                        <tr key={appointment._id}>
                          <td>
                            <div>
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <small className="text-muted">
                              {appointment.time}
                            </small>
                          </td>
                          <td>
                            {userType === "doctor"
                              ? appointment.patient?.name
                              : appointment.doctor?.name}
                          </td>
                          <td>{getStatusBadge(appointment.status)}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() =>
                                  navigate(`/appointments/${appointment._id}`)
                                }
                              >
                                <FaEye />
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() =>
                                  handleDeleteAppointment(appointment._id)
                                }
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
