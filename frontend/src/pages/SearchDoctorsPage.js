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
  FaSort,
} from "react-icons/fa";
import defaultUserImg from "../assets/default-user.png";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchFilters from "../components/SearchFilters";
import DoctorCard from "../components/DoctorCard";

const SearchDoctorsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    specialty: "",
    location: "",
    rating: "",
    availability: "",
  });
  const [sortBy, setSortBy] = useState("name");
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

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [doctors, filters, sortBy]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/doctors");
      setDoctors(response.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctors. Please try again.");
      if (window.showToast) {
        window.showToast("Failed to load doctors", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...doctors];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm) ||
          doctor.specialty.toLowerCase().includes(searchTerm) ||
          (doctor.location &&
            doctor.location.toLowerCase().includes(searchTerm))
      );
    }

    // Apply specialty filter
    if (filters.specialty) {
      filtered = filtered.filter(
        (doctor) => doctor.specialty === filters.specialty
      );
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.location &&
          doctor.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter((doctor) => (doctor.rating || 0) >= minRating);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "specialty":
          return a.specialty.localeCompare(b.specialty);
        case "location":
          return (a.location || "").localeCompare(b.location || "");
        default:
          return 0;
      }
    });

    setFilteredDoctors(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    applyFilters();
    if (window.showToast) {
      window.showToast(`Found ${filteredDoctors.length} doctors`, "info");
    }
  };

  const handleBookAppointment = (doctor) => {
    if (window.showToast) {
      window.showToast(
        `Redirecting to book appointment with Dr. ${doctor.name}`,
        "info"
      );
    }
    // Navigation will be handled by DoctorCard component
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      specialty: "",
      location: "",
      rating: "",
      availability: "",
    });
    if (window.showToast) {
      window.showToast("Filters cleared", "info");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <LoadingSpinner text="Finding the best doctors for you..." />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-primary fw-bold mb-2">Find a Doctor</h1>
              <p className="text-muted mb-0">
                Discover qualified healthcare professionals in your area
              </p>
            </div>
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="me-1" />
              {showFilters ? "Hide" : "Show"} Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <SearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
      )}

      {/* Results Header */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h5 className="mb-0">
            {filteredDoctors.length} doctor
            {filteredDoctors.length !== 1 ? "s" : ""} found
          </h5>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-end align-items-center gap-3">
            <label className="form-label mb-0 fw-semibold">Sort by:</label>
            <select
              className="form-select"
              style={{ width: "auto" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="specialty">Specialty</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="text-center py-5">
          <FaSearch size={48} className="text-muted mb-3" />
          <h4 className="text-muted">No doctors found</h4>
          <p className="text-muted">
            Try adjusting your search criteria or filters
          </p>
          <button className="btn btn-primary" onClick={clearAllFilters}>
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="col-lg-4 col-md-6">
              <DoctorCard
                doctor={doctor}
                onBookAppointment={handleBookAppointment}
              />
            </div>
          ))}
        </div>
      )}

      {/* Load More Button (if needed) */}
      {filteredDoctors.length > 0 &&
        filteredDoctors.length < doctors.length && (
          <div className="text-center mt-5">
            <button className="btn btn-outline-primary">
              Load More Doctors
            </button>
          </div>
        )}
    </div>
  );
};

export default SearchDoctorsPage;
