import React from "react";
import {
  FaFilter,
  FaSearch,
  FaMapMarkerAlt,
  FaStethoscope,
  FaStar,
} from "react-icons/fa";

const SearchFilters = ({ filters, onFilterChange, onSearch }) => {
  const specialties = [
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Neurology",
    "Dentistry",
    "Orthopedics",
    "Ophthalmology",
    "Pathology",
    "Surgery",
    "Immunology",
    "Pulmonology",
    "Gynecology",
    "Urology",
    "Endocrinology",
    "Oncology",
    "ENT",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <FaFilter className="text-primary me-2" />
          <h5 className="mb-0 fw-bold">Search Filters</h5>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Search Term */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                <FaSearch className="me-1" />
                Search Doctors
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Doctor name, specialty, or location..."
                value={filters.search || ""}
                onChange={(e) => onFilterChange("search", e.target.value)}
              />
            </div>

            {/* Specialty */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                <FaStethoscope className="me-1" />
                Specialty
              </label>
              <select
                className="form-select"
                value={filters.specialty || ""}
                onChange={(e) => onFilterChange("specialty", e.target.value)}
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                <FaMapMarkerAlt className="me-1" />
                Location
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="City or area..."
                value={filters.location || ""}
                onChange={(e) => onFilterChange("location", e.target.value)}
              />
            </div>

            {/* Rating */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                <FaStar className="me-1" />
                Minimum Rating
              </label>
              <select
                className="form-select"
                value={filters.rating || ""}
                onChange={(e) => onFilterChange("rating", e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>

            {/* Availability */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                <FaFilter className="me-1" />
                Availability
              </label>
              <select
                className="form-select"
                value={filters.availability || ""}
                onChange={(e) => onFilterChange("availability", e.target.value)}
              >
                <option value="">Any Time</option>
                <option value="today">Available Today</option>
                <option value="tomorrow">Available Tomorrow</option>
                <option value="week">This Week</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="col-12">
              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    onFilterChange("search", "");
                    onFilterChange("specialty", "");
                    onFilterChange("location", "");
                    onFilterChange("rating", "");
                    onFilterChange("availability", "");
                  }}
                >
                  Clear Filters
                </button>
                <button type="submit" className="btn btn-primary">
                  <FaSearch className="me-1" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchFilters;
