import React from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaStethoscope,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import defaultUserImg from "../assets/default-user.png";

const DoctorCard = ({ doctor, onBookAppointment }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={i} className="text-warning" style={{ fontSize: "1rem" }} />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <FaStar
          key="half"
          className="text-warning"
          style={{ opacity: 0.5, fontSize: "1rem" }}
        />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar
          key={`empty-${i}`}
          className="text-muted"
          style={{ opacity: 0.3, fontSize: "1rem" }}
        />
      );
    }
    return stars;
  };

  const handleViewProfile = () => {
    navigate(`/doctor/${doctor._id}`);
  };

  const handleBookAppointment = () => {
    if (onBookAppointment) {
      onBookAppointment(doctor);
    } else {
      // Check if user is logged in
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("userType");

      if (!token) {
        if (window.showToast) {
          window.showToast(
            "Please log in as a patient to book an appointment",
            "warning"
          );
        }
        // Store the intended booking destination
        localStorage.setItem("redirectAfterLogin", `/booking/${doctor._id}`);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return;
      }

      if (userType !== "patient") {
        if (window.showToast) {
          window.showToast("Only patients can book appointments", "warning");
        }
        return;
      }

      navigate(`/booking/${doctor._id}`);
    }
  };

  return (
    <div
      className="card h-100 shadow-sm border-0 hover-shadow"
      style={{
        transition: "all 0.3s ease",
        cursor: "pointer",
        borderRadius: "14px",
        overflow: "hidden",
        maxWidth: 320,
        margin: "0 auto",
        padding: "0.75rem 0.75rem 1rem 0.75rem",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      }}
    >
      {/* Doctor Image */}
      <div
        className="position-relative text-center"
        style={{ padding: "0.5rem 0" }}
      >
        <img
          src={
            doctor.profilePicture
              ? `http://localhost:5000${doctor.profilePicture}`
              : defaultUserImg
          }
          alt={`Dr. ${doctor.name}`}
          className="card-img-top mx-auto"
          style={{
            height: "90px",
            width: "90px",
            objectFit: "cover",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #f0f8ff, #e6f3ff)",
            marginBottom: 8,
          }}
        />
        <div className="position-absolute top-0 end-0 m-2">
          <span
            className="badge bg-success bg-opacity-90"
            style={{ fontSize: "0.8rem", padding: "4px 10px" }}
          >
            <FaClock className="me-1" style={{ fontSize: "0.9em" }} />
            Available
          </span>
        </div>
      </div>

      <div
        className="card-body d-flex flex-column p-2"
        style={{ fontSize: "0.97rem" }}
      >
        {/* Doctor Info */}
        <div className="mb-2">
          <h6
            className="card-title fw-bold text-primary mb-1"
            style={{ fontSize: "1.08rem" }}
          >
            Dr. {doctor.name}
          </h6>
          <p className="text-muted mb-1" style={{ fontSize: "0.97rem" }}>
            <FaStethoscope className="me-1" />
            {doctor.specialty}
          </p>

          {/* Rating */}
          <div className="d-flex align-items-center mb-1">
            <div className="me-2">{renderStars(doctor.rating || 4.5)}</div>
            <span className="text-muted small" style={{ fontSize: "0.93rem" }}>
              {doctor.rating || 4.5} ({doctor.reviews || 0} reviews)
            </span>
          </div>

          {/* Location */}
          {doctor.location && (
            <p className="text-muted small mb-1">
              <FaMapMarkerAlt className="me-1" />
              {doctor.location}
            </p>
          )}

          {/* Experience */}
          {doctor.experience && (
            <p className="text-muted small mb-2">
              <FaClock className="me-1" />
              {doctor.experience} experience
            </p>
          )}
        </div>

        {/* Fees */}
        {doctor.fees && (
          <div className="mb-2">
            <span
              className="badge bg-primary bg-opacity-10 text-primary fw-semibold"
              style={{ fontSize: "0.92rem" }}
            >
              ${doctor.fees} consultation fee
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto">
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary btn-sm"
              style={{ fontSize: "0.98rem", padding: "7px 0" }}
              onClick={handleBookAppointment}
            >
              <FaCalendarAlt className="me-1" />
              Book Appointment
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              style={{ fontSize: "0.98rem", padding: "7px 0" }}
              onClick={handleViewProfile}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
