import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaStar,
  FaRegStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaGraduationCap,
  FaAward,
  FaCheckCircle,
  FaTimes,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { getImageUrl, handleImageError } from "../utils/imageUtils";

const DoctorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // Available time slots (mock data - in real app, this would come from backend)
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

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      patientName: "John Smith",
      rating: 5,
      comment: "Excellent doctor! Very knowledgeable and caring.",
      date: "2024-01-15",
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      rating: 4,
      comment: "Great experience. Doctor was professional and thorough.",
      date: "2024-01-10",
    },
    {
      id: 3,
      patientName: "Mike Davis",
      rating: 5,
      comment: "Highly recommended. Solved my problem quickly.",
      date: "2024-01-05",
    },
  ];

  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`/api/doctors/${id}`);
      setDoctor(response.data);
      setReviews(mockReviews); // In real app, fetch from backend

      // Set today's date as default
      const today = new Date().toISOString().split("T")[0];
      setSelectedDate(today);
    } catch (err) {
      console.error("Error fetching doctor data:", err);
      setError("Failed to load doctor profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, [id]);

  // Listen for profile updates and re-fetch doctor data
  useEffect(() => {
    const handleProfileUpdate = () => {
      // Only re-fetch if the updated profile matches this doctor
      fetchDoctorData();
    };
    window.addEventListener("profile-updated", handleProfileUpdate);
    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, [id]);

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time for your appointment.");
      return;
    }
    navigate(`/booking/${id}`, {
      state: {
        doctor,
        selectedDate,
        selectedTime,
      },
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In real app, make API call to save favorite
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i}>
          {i <= rating ? (
            <FaStar className="text-warning" />
          ) : (
            <FaRegStar className="text-muted" />
          )}
        </span>
      );
    }
    return stars;
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading doctor profile...</p>
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
          Doctor not found.
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mt-4"
      style={{ backgroundColor: "#f2f5ff", minHeight: "100vh" }}
    >
      <div className="row g-4">
        {/* Doctor Info Card */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <img
                src={getImageUrl(doctor.profilePicture)}
                alt={
                  doctor.name
                    ? `Profile of Dr. ${doctor.name}`
                    : "Doctor profile placeholder"
                }
                className="rounded-circle mb-3"
                width="200"
                height="200"
                style={{ objectFit: "cover" }}
                onError={handleImageError}
              />

              <h3 className="card-title">{doctor.name}</h3>
              <p className="text-primary fw-bold mb-2">{doctor.specialty}</p>

              <div className="d-flex justify-content-center align-items-center mb-2">
                {renderStars(parseFloat(getAverageRating()))}
                <span className="ms-2 text-muted">
                  {getAverageRating()} ({reviews.length} reviews)
                </span>
              </div>

              {doctor.location && (
                <p className="text-muted mb-2">
                  <FaMapMarkerAlt className="me-1" />
                  {doctor.location}
                </p>
              )}

              {doctor.fees && (
                <p className="text-primary fw-bold mb-3">
                  Consultation Fee: ${doctor.fees}
                </p>
              )}

              <div className="d-flex gap-2 mb-3">
                <button
                  className="btn btn-primary flex-fill"
                  onClick={handleBookAppointment}
                  aria-label="Book appointment"
                >
                  <FaCalendarAlt className="me-1" />
                  Book Appointment
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={toggleFavorite}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              <div className="border-top pt-3">
                <h6 className="text-muted mb-2">Contact Information</h6>
                <p className="mb-1">
                  <FaEnvelope className="me-2 text-muted" />
                  {doctor.email}
                </p>
                {doctor.phone && (
                  <p className="mb-0">
                    <FaPhone className="me-2 text-muted" />
                    {doctor.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-8">
          {/* About Section */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="card-title mb-3">About Dr. {doctor.name}</h4>
              <p className="text-muted">
                {doctor.bio ||
                  `Dr. ${doctor.name} is a highly qualified ${doctor.specialty} with extensive experience in providing exceptional healthcare services. With a focus on patient-centered care, Dr. ${doctor.name} ensures that each patient receives personalized attention and the best possible treatment.`}
              </p>

              <div className="row mt-4">
                <div className="col-md-6">
                  <h6 className="text-primary">
                    <FaGraduationCap className="me-2" />
                    Education
                  </h6>
                  <p className="text-muted">
                    {doctor.education ||
                      "Medical Degree from prestigious university"}
                  </p>
                </div>
                <div className="col-md-6">
                  <h6 className="text-primary">
                    <FaAward className="me-2" />
                    Experience
                  </h6>
                  <p className="text-muted">
                    {doctor.experience || "10+ years of clinical experience"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="card-title mb-3">Book an Appointment</h4>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Select Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    aria-label="Select appointment date"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Select Time</label>
                  <select
                    className="form-select"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    aria-label="Select appointment time"
                  >
                    <option value="">Choose a time</option>
                    {availableSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                className="btn btn-primary mt-3"
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedTime}
              >
                <FaCalendarAlt className="me-1" />
                Book Appointment
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3">Patient Reviews</h4>

              {reviews.length === 0 ? (
                <p className="text-muted">No reviews yet.</p>
              ) : (
                <div>
                  {reviews.map((review) => (
                    <div key={review.id} className="border-bottom pb-3 mb-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="mb-1">{review.patientName}</h6>
                          <div className="d-flex align-items-center">
                            {renderStars(review.rating)}
                            <span className="ms-2 text-muted">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted mb-0">{review.comment}</p>
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

export default DoctorProfilePage;
