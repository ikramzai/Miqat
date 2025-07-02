import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";

const BookingPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingData, setBookingData] = useState({
    date: location.state?.selectedDate || "",
    time: location.state?.selectedTime || "",
    reason: "",
    notes: "",
  });

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  const availableSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const appointmentReasons = [
    "General Checkup",
    "Follow-up Visit",
    "Consultation",
    "Emergency",
    "Prescription Renewal",
    "Test Results Review",
    "Vaccination",
    "Physical Examination",
    "Mental Health Consultation",
    "Chronic Disease Management",
    "Preventive Care",
    "Other",
  ];

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (userType !== "patient") {
      navigate("/doctor");
      return;
    }
    fetchDoctorData();
  }, [token, userType, navigate, doctorId]);

  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`/api/doctors/${doctorId}`);
      setDoctor(response.data);
    } catch (err) {
      console.error("Error fetching doctor data:", err);
      setError("Failed to load doctor information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setError("");

    // Validate all required fields
    const validationErrors = [];

    if (!bookingData.date) {
      validationErrors.push("Please select an appointment date");
    }

    if (!bookingData.time) {
      validationErrors.push("Please select an appointment time");
    }

    if (!bookingData.reason || bookingData.reason.trim() === "") {
      validationErrors.push("Please provide a reason for your visit");
    }

    if (validationErrors.length > 0) {
      setError(validationErrors.join(". "));
      return;
    }

    try {
      setLoading(true);
      setError("");

      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Format date properly for backend
      const formattedDate = new Date(bookingData.date).toISOString();

      const appointmentData = {
        doctor: doctorId,
        date: formattedDate,
        time: bookingData.time,
        reason: bookingData.reason.trim(),
        notes: bookingData.notes.trim(),
      };

      console.log(
        "🔍 Frontend - Submitting appointment data:",
        appointmentData
      );
      console.log("🔍 Frontend - Token present:", !!token);
      console.log("🔍 Frontend - User type:", userType);

      const response = await axios.post(
        "/api/appointments",
        appointmentData,
        config
      );

      console.log(
        "✅ Frontend - Appointment booked successfully:",
        response.data
      );

      alert("Appointment booked successfully!");
      navigate("/patient");
    } catch (err) {
      console.error("❌ Frontend - Error booking appointment:", err);
      console.error("❌ Frontend - Error response data:", err.response?.data);
      console.error("❌ Frontend - Error status:", err.response?.status);
      console.error(
        "❌ Frontend - Error message:",
        err.response?.data?.message
      );

      // Handle different types of errors
      if (err.response?.status === 400) {
        if (err.response.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Please check your booking details and try again.");
        }
      } else if (err.response?.status === 401) {
        setError("Please log in again to book an appointment.");
        navigate("/login");
      } else if (err.response?.status === 409) {
        setError(
          "This time slot is already booked. Please select a different time."
        );
      } else {
        setError("Failed to book appointment. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading booking information...</p>
      </div>
    );
  }

  if (error && !doctor) {
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
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-primary mb-4">Book Appointment</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {doctor && (
                <div className="row mb-4">
                  <div className="col-md-4 text-center">
                    <img
                      src={doctor.image || "https://via.placeholder.com/120"}
                      alt={doctor.name}
                      className="rounded-circle mb-3"
                      width="120"
                      height="120"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <h4>{doctor.name}</h4>
                    <p className="text-primary fw-bold">{doctor.specialty}</p>
                    {doctor.location && (
                      <p className="text-muted">
                        <FaMapMarkerAlt className="me-1" />
                        {doctor.location}
                      </p>
                    )}
                    {doctor.fees && (
                      <p className="text-primary fw-bold">
                        Consultation Fee: ${doctor.fees}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      <FaCalendarAlt className="me-1" />
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={bookingData.date}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      <FaClock className="me-1" />
                      Appointment Time *
                    </label>
                    <select
                      className="form-select"
                      value={bookingData.time}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">Select a time</option>
                      {availableSlots.map((slot, index) => (
                        <option key={index} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">
                      <FaUser className="me-1" />
                      Reason for Visit *
                    </label>
                    <select
                      className="form-select"
                      value={bookingData.reason}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          reason: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">Select a reason</option>
                      {appointmentReasons.map((reason, index) => (
                        <option key={index} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Any additional information you'd like to share..."
                      value={bookingData.notes}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h6 className="card-title">
                          <FaCreditCard className="me-1" />
                          Appointment Summary
                        </h6>
                        <div className="row">
                          <div className="col-md-6">
                            <p className="mb-1">
                              <strong>Doctor:</strong> {doctor?.name}
                            </p>
                            <p className="mb-1">
                              <strong>Specialty:</strong> {doctor?.specialty}
                            </p>
                            <p className="mb-1">
                              <strong>Date:</strong>{" "}
                              {bookingData.date || "Not selected"}
                            </p>
                            <p className="mb-1">
                              <strong>Time:</strong>{" "}
                              {bookingData.time || "Not selected"}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p className="mb-1">
                              <strong>Fee:</strong> $
                              {doctor?.fees || "Not specified"}
                            </p>
                            <p className="mb-1">
                              <strong>Status:</strong>{" "}
                              <span className="badge bg-warning">Pending</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary flex-fill"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Booking...
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/search")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
