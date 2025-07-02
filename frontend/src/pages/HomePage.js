import React, { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaStar,
  FaRegStar,
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
  FaLungs,
  FaFemale,
  FaTint,
  FaChartLine,
  FaRadiation,
  FaDeaf,
  FaCheckCircle,
  FaShieldAlt,
  FaBell,
  FaExchangeAlt,
  FaComments,
  FaArrowRight,
  FaPlay,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // Color scheme
  const primaryColor = "#2a7de1";
  const secondaryColor = "#1e88e5";
  const lightBackground = "#f8faff";
  const white = "#ffffff";
  const textDark = "#2c3e50";
  const textMuted = "#6c757d";

  // Enhanced specialties with colors and animations
  const specialties = [
    {
      name: "Cardiology",
      icon: <FaHeartbeat />,
      color: "#e74c3c",
    },
    {
      name: "Dermatology",
      icon: <FaUserMd />,
      color: "#8e44ad",
    },
    {
      name: "Pediatrics",
      icon: <FaChild />,
      color: "#3498db",
    },
    {
      name: "Neurology",
      icon: <FaHeadSideVirus />,
      color: "#f39c12",
    },
    {
      name: "Dentistry",
      icon: <FaTooth />,
      color: "#1abc9c",
    },
    {
      name: "Orthopedics",
      icon: <FaBone />,
      color: "#95a5a6",
    },
    {
      name: "Ophthalmology",
      icon: <FaEye />,
      color: "#9b59b6",
    },
    {
      name: "Pathology",
      icon: <FaFlask />,
      color: "#e67e22",
    },
    {
      name: "Surgery",
      icon: <FaProcedures />,
      color: "#c0392b",
    },
    {
      name: "Immunology",
      icon: <FaSyringe />,
      color: "#16a085",
    },
    {
      name: "Pulmonology",
      icon: <FaLungs />,
      color: "#2980b9",
    },
    {
      name: "Gynecology",
      icon: <FaFemale />,
      color: "#e84393",
    },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.8,
      reviews: 124,
      distance: 2.5,
      experience: "15 years",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      rating: 4.9,
      reviews: 89,
      distance: 1.2,
      experience: "12 years",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      specialty: "Pediatrician",
      rating: 4.7,
      reviews: 156,
      distance: 3.1,
      experience: "18 years",
      image:
        "https://images.unsplash.com/photo-1594824475317-7e2f8e8a4d21?w=300&h=300&fit=crop&crop=face",
    },
  ];

  const features = [
    {
      icon: <FaCheckCircle size={40} />,
      title: "Verified Doctors",
      description: "All doctors are thoroughly vetted and certified",
      color: "#28a745",
    },
    {
      icon: <FaCalendarAlt size={40} />,
      title: "24/7 Booking",
      description: "Book appointments anytime, anywhere",
      color: "#17a2b8",
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "Secure Payments",
      description: "Your transactions are always protected",
      color: "#ffc107",
    },
    {
      icon: <FaBell size={40} />,
      title: "Smart Reminders",
      description: "Never miss an appointment again",
      color: "#dc3545",
    },
  ];

  const testimonials = [
    {
      name: "John D.",
      role: "Patient",
      quote:
        "Found the perfect specialist in minutes! The booking process was incredibly smooth and the doctor was excellent.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Maria S.",
      role: "Patient",
      quote:
        "The booking process was incredibly smooth. I love how easy it is to find and book appointments with qualified doctors.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "David K.",
      role: "Patient",
      quote:
        "Saved me hours of waiting at the clinic! The online booking system is a game-changer for busy professionals.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  ];

  // Steps for the process
  const steps = [
    {
      icon: <FaSearch size={28} className="text-primary" />,
      title: "Search doctor",
      desc: "We help you find top specialists near you. Let us bring you healthy living as our top priority.",
    },
    {
      icon: <FaUserMd size={28} className="text-primary" />,
      title: "Check doctor Profile",
      desc: "See available specialists and their profiles. Get notified when availability opens up.",
    },
    {
      icon: <FaCalendarAlt size={28} className="text-primary" />,
      title: "Schedule Appointment",
      desc: "Book appointments in a few clicks. Choose your time and we'll handle the rest.",
    },
    {
      icon: <FaCheckCircle size={28} className="text-primary" />,
      title: "Get your Solution",
      desc: "Get the care you need, when you need it. We'll notify you as soon as your appointment is confirmed.",
    },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (location) params.append("location", location);
    navigate(`/search?${params.toString()}`);
  };

  const handleBookAppointment = (doctor) => {
    navigate(`/booking/${doctor.id}`);
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSpecialtyClick = (specialty) => {
    navigate(`/search?specialty=${encodeURIComponent(specialty.name)}`);
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

  return (
    <div style={{ background: "#f7faff", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        className="container py-5 d-flex flex-column flex-lg-row align-items-center justify-content-between"
        style={{ minHeight: "60vh" }}
      >
        {/* Left: Headline and Search */}
        <div className="flex-fill" style={{ maxWidth: 540 }}>
          <h1
            className="fw-bold mb-3"
            style={{ fontSize: "2.7rem", lineHeight: 1.1 }}
          >
            Find local specialists <br /> who can take your{" "}
            <span className="text-primary">insurance</span>
          </h1>
          <p className="mb-4 text-muted" style={{ fontSize: "1.15rem" }}>
            We help you find available vaccine appointments near you or notify
            you when availability opens up.
          </p>
          <div className="d-flex gap-2 mb-3">
            <button
              className="btn btn-primary btn-lg px-5"
              style={{ borderRadius: 12 }}
              onClick={handleSignUp}
            >
              Get Started
            </button>
          </div>
        </div>
        {/* Right: Doctor Image and Abstract Shapes */}
        <div
          className="flex-fill d-flex justify-content-center align-items-center position-relative mt-5 mt-lg-0"
          style={{ minWidth: 320 }}
        >
          {/* Abstract shapes */}
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              background: "#e3f0ff",
              borderRadius: "50%",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: -20,
              width: 80,
              height: 80,
              background: "#ffd6e0",
              borderRadius: "50%",
              zIndex: 0,
            }}
          />
          {/* Doctor card */}
          <div
            className="card shadow-lg p-0"
            style={{ borderRadius: 24, width: 320, zIndex: 1 }}
          >
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
              alt="Doctor"
              className="w-100"
              style={{
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                height: 320,
                objectFit: "cover",
              }}
            />
            <div className="p-3 text-center">
              <span className="fw-bold text-primary">Dr. Jane Doe</span>
              <div className="text-muted" style={{ fontSize: 14 }}>
                General Practitioner
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span
            className="text-uppercase text-primary fw-bold"
            style={{ letterSpacing: 1 }}
          >
            Patient Solution
          </span>
          <h2 className="fw-bold mt-2" style={{ fontSize: "2rem" }}>
            4 easy steps to get your Solution
          </h2>
        </div>
        <div className="row g-4 justify-content-center">
          {steps.map((step, idx) => (
            <div className="col-12 col-md-6 col-lg-3" key={idx}>
              <div
                className="card border-0 shadow-sm h-100 text-center p-4"
                style={{ borderRadius: 18 }}
              >
                <div className="mb-3">{step.icon}</div>
                <h5 className="fw-bold mb-2">{step.title}</h5>
                <p className="text-muted mb-0" style={{ fontSize: 15 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-5" style={{ backgroundColor: white }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2
              className="fw-bold mb-3"
              style={{ color: textDark, fontSize: "2.5rem" }}
            >
              Medical Specialties
            </h2>
            <p className="lead text-muted" style={{ fontSize: "1.2rem" }}>
              Find specialists in every field of medicine
            </p>
          </div>

          <div className="row g-4">
            {specialties.map((specialty, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                <div
                  className="card border-0 shadow-sm h-100 text-center"
                  style={{
                    borderRadius: "15px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    transform:
                      hoveredCard === index
                        ? "translateY(-10px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredCard === index
                        ? "0 20px 40px rgba(0,0,0,0.1)"
                        : "0 5px 15px rgba(0,0,0,0.08)",
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleSpecialtyClick(specialty)}
                >
                  <div className="card-body p-4">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "70px",
                        height: "70px",
                        backgroundColor: `${specialty.color}20`,
                        color: specialty.color,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <span style={{ fontSize: "1.5rem" }}>
                        {specialty.icon}
                      </span>
                    </div>
                    <h5 className="fw-bold mb-2" style={{ color: textDark }}>
                      {specialty.name}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2
              className="fw-bold mb-3"
              style={{ color: textDark, fontSize: "2.5rem" }}
            >
              Why Choose MiQat?
            </h2>
            <p className="lead text-muted" style={{ fontSize: "1.2rem" }}>
              Experience healthcare booking like never before
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4 text-center">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: `${feature.color}20`,
                        color: feature.color,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h5 className="fw-bold mb-3" style={{ color: textDark }}>
                      {feature.title}
                    </h5>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2
              className="fw-bold mb-3"
              style={{ color: textDark, fontSize: "2.5rem" }}
            >
              What Our Patients Say
            </h2>
            <p className="lead text-muted" style={{ fontSize: "1.2rem" }}>
              Real experiences from our community
            </p>
          </div>

          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <div className="col-lg-4" key={index}>
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p
                      className="text-muted mb-4"
                      style={{ fontStyle: "italic" }}
                    >
                      "{testimonial.quote}"
                    </p>
                    <div className="d-flex align-items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        width="50"
                        height="50"
                        style={{ objectFit: "cover" }}
                      />
                      <div>
                        <h6
                          className="fw-bold mb-0"
                          style={{ color: textDark }}
                        >
                          {testimonial.name}
                        </h6>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-5"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          color: white,
        }}
      >
        <div className="container text-center">
          <h2 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>
            Ready to Get Started?
          </h2>
          <p className="lead mb-4" style={{ fontSize: "1.2rem", opacity: 0.9 }}>
            Join thousands of patients who trust MiQat for their healthcare
            needs
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button
              className="btn btn-light btn-lg px-4 py-3 fw-semibold"
              onClick={handleSignUp}
              style={{ borderRadius: "10px" }}
            >
              Sign Up Now <FaArrowRight className="ms-2" />
            </button>
            <button
              className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold"
              onClick={() => navigate("/search")}
              style={{ borderRadius: "10px" }}
            >
              Find a Doctor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
