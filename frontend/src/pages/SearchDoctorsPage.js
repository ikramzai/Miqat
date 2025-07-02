import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaStar,
  FaRegStar,
  FaFilter,
  FaCalendarAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaHeartbeat,
  FaUserMd,
  FaChild,
  FaHeadSideVirus,
  FaTooth,
  FaBone,
  FaEye,
  FaFlask,
  FaProcedures,
  FaSyringe,
  FaFemale,
  FaTint,
  FaChartLine,
  FaRadiation,
  FaDeaf,
} from "react-icons/fa";
import defaultUserImg from "../assets/default-user.png";

const SearchDoctorsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [filters, setFilters] = useState({
    specialty: searchParams.get("specialty") || "",
    location: searchParams.get("location") || "",
    rating: searchParams.get("rating") || "",
    availability: searchParams.get("availability") || "",
    searchTerm: searchParams.get("search") || "",
  });

  const [showFilters, setShowFilters] = useState(false);

  // Specialties with icons
  const specialties = [
    { name: "Cardiology", icon: <FaHeartbeat />, color: "#e74c3c" },
    { name: "Dermatology", icon: <FaUserMd />, color: "#8e44ad" },
    { name: "Pediatrics", icon: <FaChild />, color: "#3498db" },
    { name: "Neurology", icon: <FaHeadSideVirus />, color: "#f39c12" },
    { name: "Dentistry", icon: <FaTooth />, color: "#1abc9c" },
    { name: "Orthopedics", icon: <FaBone />, color: "#95a5a6" },
    { name: "Ophthalmology", icon: <FaEye />, color: "#9b59b6" },
    { name: "Pathology", icon: <FaFlask />, color: "#e67e22" },
    { name: "Surgery", icon: <FaProcedures />, color: "#c0392b" },
    { name: "Immunology", icon: <FaSyringe />, color: "#16a085" },
    { name: "Pulmonology", icon: <FaTint />, color: "#2980b9" },
    { name: "Gynecology", icon: <FaFemale />, color: "#e84393" },
    { name: "Urology", icon: <FaTint />, color: "#0984e3" },
    { name: "Endocrinology", icon: <FaChartLine />, color: "#fdcb6e" },
    { name: "Oncology", icon: <FaRadiation />, color: "#d63031" },
    { name: "ENT", icon: <FaDeaf />, color: "#fd79a8" },
  ];

  // Fetch doctors based on filters
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError("");

        // Build query parameters
        const params = new URLSearchParams();
        if (filters.specialty) params.append("specialty", filters.specialty);
        if (filters.location) params.append("location", filters.location);
        if (filters.rating) params.append("rating", filters.rating);
        if (filters.availability)
          params.append("availability", filters.availability);
        if (filters.searchTerm) params.append("search", filters.searchTerm);

        const response = await api.get(`/doctors/search?${params.toString()}`);
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [filters]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      specialty: "",
      location: "",
      rating: "",
      availability: "",
      searchTerm: "",
    });
  };

  const handleBookAppointment = (doctorId) => {
    navigate(`/booking/${doctorId}`);
  };

  const handleViewProfile = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
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

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Searching for doctors...</p>
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
      {/* Search Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-primary mb-3">Find a Doctor</h2>

              {/* Search Bar */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by name, specialty, or symptoms..."
                      value={filters.searchTerm}
                      onChange={(e) =>
                        handleFilterChange("searchTerm", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaMapMarkerAlt />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location"
                      value={filters.location}
                      onChange={(e) =>
                        handleFilterChange("location", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <FaFilter /> Filters
                  </button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="row g-3 mb-3">
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      value={filters.specialty}
                      onChange={(e) =>
                        handleFilterChange("specialty", e.target.value)
                      }
                    >
                      <option value="">All Specialties</option>
                      {specialties.map((specialty, index) => (
                        <option key={index} value={specialty.name}>
                          {specialty.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      value={filters.rating}
                      onChange={(e) =>
                        handleFilterChange("rating", e.target.value)
                      }
                    >
                      <option value="">All Ratings</option>
                      <option value="4">4+ Stars</option>
                      <option value="3">3+ Stars</option>
                      <option value="2">2+ Stars</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      value={filters.availability}
                      onChange={(e) =>
                        handleFilterChange("availability", e.target.value)
                      }
                    >
                      <option value="">Any Availability</option>
                      <option value="today">Available Today</option>
                      <option value="week">Available This Week</option>
                      <option value="next">Available Next Week</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <button
                      className="btn btn-outline-secondary w-100"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-primary mb-0">
              {doctors.length} Doctor{doctors.length !== 1 ? "s" : ""} Found
            </h4>
            <div className="text-muted">Showing results for your search</div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {doctors.length === 0 && !loading && (
            <div className="text-center py-5">
              <h5 className="text-muted">No doctors found</h5>
              <p className="text-muted">Try adjusting your search criteria</p>
            </div>
          )}

          {/* Doctor Cards */}
          <div className="row g-4">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="col-lg-6 col-xl-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-start mb-3">
                      <img
                        src={doctor.image ? doctor.image : defaultUserImg}
                        alt={doctor.name}
                        className="rounded-circle me-3"
                        width="80"
                        height="80"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">{doctor.name}</h5>
                        <p className="text-muted mb-1">{doctor.specialty}</p>
                        <div className="d-flex align-items-center mb-1">
                          {renderStars(doctor.rating || 4.5)}
                          <span className="ms-2 text-muted">
                            ({doctor.reviews || 0} reviews)
                          </span>
                        </div>
                        {doctor.location && (
                          <p className="text-muted mb-0">
                            <FaMapMarkerAlt className="me-1" />
                            {doctor.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {doctor.fees && (
                      <p className="text-primary fw-bold mb-2">
                        Consultation Fee: ${doctor.fees}
                      </p>
                    )}

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary flex-fill"
                        onClick={() => handleBookAppointment(doctor._id)}
                      >
                        <FaCalendarAlt className="me-1" />
                        Book Now
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleViewProfile(doctor._id)}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDoctorsPage;
 