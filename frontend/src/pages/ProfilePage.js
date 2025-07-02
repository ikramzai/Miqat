import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaTrash,
  FaStethoscope,
  FaCalendarAlt,
} from "react-icons/fa";
import defaultUserImg from "../assets/default-user.png";

const API_BASE_URL = "http://localhost:5000"; // adjust if needed

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    specialty: "",
    fees: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserProfile();
  }, [token, navigate]);

  // Cleanup object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(URL.createObjectURL(selectedFile));
      }
    };
  }, [selectedFile]);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const endpoint =
        userType === "doctor" ? "/doctors/profile/me" : "/patients/profile/me";
      const response = await api.get(endpoint, config);
      setUser(response.data);
      setFormData(
        userType === "doctor"
          ? {
              name: response.data.name || "",
              email: response.data.email || "",
              phone: response.data.phone || "",
              location: response.data.location || "",
              specialty: response.data.specialty || "",
              fees: response.data.fees || "",
            }
          : {
              name: response.data.name || "",
              email: response.data.email || "",
              phone: response.data.phone || "",
            }
      );
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/login");
      } else {
        setError("Failed to load profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        e.target.value = "";
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        e.target.value = "";
        return;
      }

      setSelectedFile(file);
      setError("");
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setIsUpdating(true);

    // Basic validation
    if (!formData.name.trim()) {
      setError("Name is required");
      setIsUpdating(false);
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      setIsUpdating(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setIsUpdating(false);
      return;
    }

    // Doctor-specific validation
    if (userType === "doctor") {
      if (!formData.specialty.trim()) {
        setError("Specialty is required for doctors");
        setIsUpdating(false);
        return;
      }

      if (formData.fees && isNaN(formData.fees)) {
        setError("Consultation fee must be a valid number");
        setIsUpdating(false);
        return;
      }

      if (formData.fees && parseFloat(formData.fees) < 0) {
        setError("Consultation fee cannot be negative");
        setIsUpdating(false);
        return;
      }
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("email", formData.email.trim());
      formDataToSend.append("phone", formData.phone.trim());
      if (userType === "doctor") {
        formDataToSend.append("location", formData.location.trim());
        formDataToSend.append("specialty", formData.specialty.trim());
        formDataToSend.append("fees", formData.fees);
      }
      if (selectedFile) {
        formDataToSend.append("profilePicture", selectedFile);
      }

      const endpoint =
        userType === "doctor" ? "/doctors/profile/me" : "/patients/profile/me";
      const res = await api.put(endpoint, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
      setFormData(
        userType === "doctor"
          ? {
              name: res.data.name || "",
              email: res.data.email || "",
              phone: res.data.phone || "",
              location: res.data.location || "",
              specialty: res.data.specialty || "",
              fees: res.data.fees || "",
            }
          : {
              name: res.data.name || "",
              email: res.data.email || "",
              phone: res.data.phone || "",
            }
      );
      setSelectedFile(null);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const endpoint =
          userType === "doctor"
            ? "/doctors/profile/me"
            : "/patients/profile/me";
        await api.delete(endpoint, config);
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        localStorage.removeItem("userData");
        navigate("/");
      } catch (err) {
        console.error("Error deleting account:", err);
        setError("Failed to delete account. Please try again.");
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setError("");
    setSuccess("");
    // Reset form data to original user data
    setFormData(
      userType === "doctor"
        ? {
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            location: user?.location || "",
            specialty: user?.specialty || "",
            fees: user?.fees || "",
          }
        : {
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
          }
    );
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading profile...</p>
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
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary mb-0">My Profile</h2>
                <div className="d-flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={handleSubmit}
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave className="me-1" />
                            Save
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={handleCancelEdit}
                      >
                        <FaTimes className="me-1" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <FaEdit className="me-1" />
                      Edit
                    </button>
                  )}
                </div>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <i className="fas fa-check-circle me-2"></i>
                  {success}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSuccess("")}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <div className="row">
                <div className="col-md-4 text-center mb-4">
                  <img
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : user?.profilePicture
                        ? `${API_BASE_URL}${user.profilePicture}`
                        : defaultUserImg
                    }
                    alt="Profile"
                    className="rounded-circle mb-3"
                    width="150"
                    height="150"
                    style={{ objectFit: "cover" }}
                  />
                  {isEditing && (
                    <div className="mb-3">
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {selectedFile && (
                        <small className="text-muted d-block mt-1">
                          Selected: {selectedFile.name}
                        </small>
                      )}
                    </div>
                  )}
                </div>

                <div className="col-md-8">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        <FaUser className="me-1" />
                        Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="form-control-plaintext">{user?.name}</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        <FaEnvelope className="me-1" />
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="form-control-plaintext">{user?.email}</p>
                      )}
                    </div>

                    {userType === "doctor" && (
                      <div className="col-md-6">
                        <label className="form-label">Specialty</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            name="specialty"
                            value={formData.specialty || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          <p className="form-control-plaintext">
                            {user?.specialty}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="col-md-6">
                      <label className="form-label">
                        <FaPhone className="me-1" />
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="form-control-plaintext">
                          {user?.phone || "Not provided"}
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        <FaMapMarkerAlt className="me-1" />
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          name="location"
                          value={formData.location || ""}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="form-control-plaintext">
                          {user?.location || "Not provided"}
                        </p>
                      )}
                    </div>

                    {userType === "doctor" && (
                      <div className="col-md-6">
                        <label className="form-label">Consultation Fee</label>
                        {isEditing ? (
                          <input
                            type="number"
                            className="form-control"
                            name="fees"
                            value={formData.fees || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          <p className="form-control-plaintext">
                            ${user?.fees || "Not set"}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-top pt-4 mt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="text-danger">Danger Zone</h5>
                    <p className="text-muted">
                      Once you delete your account, there is no going back.
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
