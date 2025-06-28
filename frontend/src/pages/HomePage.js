import React from 'react';
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
  FaAllergies,
  FaLungs,
  FaSyringe,
  FaFemale,
  FaTint,
  FaChartLine,
  FaRadiation,
  FaDeaf,
  FaCheckCircle,
  FaShieldAlt,
  FaBell,
  FaExchangeAlt,
  FaPhone,
  FaComments,
  FaUserFriends
} from 'react-icons/fa';

const HomePage = () => {
  // Color scheme
  const primaryColor = '#2a7de1';
  const lightBackground = '#e8f4fc';
  const white = '#ffffff';
  const textDark = '#333333';
  const textMuted = '#666666';

  // Enhanced specialties with colors and animations
  const specialties = [
    { name: 'Cardiology', icon: <FaHeartbeat />, color: '#e74c3c' },
    { name: 'Dermatology', icon: <FaUserMd />, color: '#8e44ad' },
    { name: 'Pediatrics', icon: <FaChild />, color: '#3498db' },
    { name: 'Neurology', icon: <FaHeadSideVirus />, color: '#f39c12' },
    { name: 'Dentistry', icon: <FaTooth />, color: '#1abc9c' },
    { name: 'Orthopedics', icon: <FaBone />, color: '#95a5a6' },
    { name: 'Ophthalmology', icon: <FaEye />, color: '#9b59b6' },
    { name: 'Pathology', icon: <FaFlask />, color: '#e67e22' },
    { name: 'Surgery', icon: <FaProcedures />, color: '#c0392b' },
    { name: 'Immunology', icon: <FaSyringe />, color: '#16a085' },
    { name: 'Pulmonology', icon: <FaLungs />, color: '#2980b9' },
    { name: 'Gynecology', icon: <FaFemale />, color: '#e84393' },
    { name: 'Urology', icon: <FaTint />, color: '#0984e3' },
    { name: 'Endocrinology', icon: <FaChartLine />, color: '#fdcb6e' },
    { name: 'Oncology', icon: <FaRadiation />, color: '#d63031' },
    { name: 'ENT', icon: <FaDeaf />, color: '#fd79a8' }
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.8,
      reviews: 124,
      distance: 2.5,
      image: '/images/doctor1.jpg'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      rating: 4.9,
      reviews: 89,
      distance: 1.2,
      image: '/images/doctor2.jpg'
    },
    {
      id: 3,
      name: 'Dr. Priya Patel',
      specialty: 'Pediatrician',
      rating: 4.7,
      reviews: 156,
      distance: 3.1,
      image: '/images/doctor3.jpg'
    }
  ];

  const features = [
    {
      icon: <FaCheckCircle size={40} />,
      title: "Verified Doctors",
      description: "All doctors are thoroughly vetted and certified"
    },
    {
      icon: <FaCalendarAlt size={40} />,
      title: "24/7 Booking",
      description: "Book appointments anytime, anywhere"
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "Secure Payments",
      description: "Your transactions are always protected"
    },
    {
      icon: <FaBell size={40} />,
      title: "Smart Reminders",
      description: "Never miss an appointment again"
    },
    {
      icon: <FaExchangeAlt size={40} />,
      title: "Easy Rescheduling",
      description: "Change appointments with one click"
    },
    {
      icon: <FaComments size={40} />,
      title: "Instant Support",
      description: "24/7 customer service available"
    }
  ];

  const testimonials = [
    {
      name: "John D.",
      role: "Patient",
      quote: "Found the perfect specialist in minutes!",
      rating: 5,
      image: "/images/patient1.jpg"
    },
    {
      name: "Maria S.",
      role: "Patient",
      quote: "The booking process was incredibly smooth.",
      rating: 4,
      image: "/images/patient2.jpg"
    },
    {
      name: "David K.",
      role: "Patient",
      quote: "Saved me hours of waiting at the clinic!",
      rating: 5,
      image: "/images/patient3.jpg"
    }
  ];

  // Animation styles
  const cardHoverStyle = {
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 20px ${primaryColor}20`,
    borderColor: 'currentColor'
  };

  return (
    <div className="home-page" style={{ backgroundColor: white }}>
      {/* Hero Section */}
      <div className="hero-section" style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, #1a5fb4 100%)`,
        color: white,
        padding: '4rem 1rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '600' }}>Find & Book Appointments</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Connect with the best doctors near you
        </p>
        
        {/* Search Bar */}
        <div className="search-container" style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: white,
          borderRadius: '50px',
          padding: '10px',
          display: 'flex',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
            flex: 1,
            borderRight: '1px solid #eee'
          }}>
            <FaSearch style={{ color: textMuted, marginRight: '10px' }} />
            <input 
              type="text" 
              placeholder="Search doctors, specialties..." 
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                padding: '8px 0',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
            flex: 0.8,
            borderRight: '1px solid #eee'
          }}>
            <FaMapMarkerAlt style={{ color: textMuted, marginRight: '10px' }} />
            <input 
              type="text" 
              placeholder="Location" 
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                padding: '8px 0',
                fontSize: '1rem'
              }}
            />
          </div>
          <button style={{
            backgroundColor: primaryColor,
            color: white,
            border: 'none',
            borderRadius: '50px',
            padding: '10px 25px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            ':hover': {
              backgroundColor: '#1a5fb4'
            }
          }}>
            <FaSearch style={{ marginRight: '8px' }} />
            Search
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ 
        padding: '3rem 1rem', 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        {/* Specialties Section */}
        <section style={{ 
          marginBottom: '3rem',
          backgroundColor: white,
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ 
            marginBottom: '1.5rem', 
            color: textDark,
            fontWeight: '600'
          }}>Medical Specialties</h2>
          <div className="specialties-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1.2rem'
          }}>
            {specialties.map((specialty, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: white,
                  borderRadius: '10px',
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  border: '1px solid #e0e0e0',
                  color: specialty.color
                }}
                onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              >
                <div style={{
                  backgroundColor: `${specialty.color}20`,
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: specialty.color
                }}>
                  {React.cloneElement(specialty.icon, { size: 24 })}
                </div>
                <h3 style={{ 
                  fontSize: '1rem', 
                  margin: 0,
                  color: textDark,
                  fontWeight: '500'
                }}>{specialty.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section style={{ 
          marginBottom: '3rem',
          backgroundColor: white,
          padding: '3rem 2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: textDark,
            fontWeight: '600'
          }}>Why Choose Our Platform?</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {features.map((feature, index) => (
              <div 
                key={index}
                style={{
                  padding: '1.5rem',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <div style={{
                  color: primaryColor,
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  marginBottom: '0.8rem',
                  color: textDark,
                  fontWeight: '500'
                }}>{feature.title}</h3>
                <p style={{
                  color: textMuted,
                  lineHeight: '1.6'
                }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top Doctors Section */}
        <section style={{ 
          marginBottom: '3rem',
          backgroundColor: white,
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1.5rem' 
          }}>
            <h2 style={{ color: textDark, fontWeight: '600' }}>Top Doctors Near You</h2>
            <a href="/doctors" style={{ 
              color: primaryColor, 
              textDecoration: 'none',
              fontWeight: '500'
            }}>View All</a>
          </div>
          
          <div className="doctors-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {doctors.map(doctor => (
              <div 
                key={doctor.id} 
                style={{
                  backgroundColor: white,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  border: '1px solid #e0e0e0'
                }}
                onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{
                  height: '200px',
                  backgroundImage: `url(${doctor.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: textDark }}>{doctor.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FaStar style={{ color: '#FFD700', marginRight: '5px' }} />
                      <span style={{ color: textDark }}>{doctor.rating}</span>
                    </div>
                  </div>
                  <p style={{ color: textMuted, marginBottom: '0.5rem' }}>{doctor.specialty}</p>
                  <p style={{ color: textMuted, marginBottom: '1rem', fontSize: '0.9rem' }}>
                    <FaMapMarkerAlt style={{ marginRight: '5px', color: primaryColor }} />
                    {doctor.distance} km away • {doctor.reviews} reviews
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button style={{
                      backgroundColor: white,
                      color: primaryColor,
                      border: `1px solid ${primaryColor}`,
                      borderRadius: '8px',
                      padding: '8px 15px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      ':hover': {
                        backgroundColor: lightBackground
                      }
                    }}>
                      View Profile
                    </button>
                    <button style={{
                      backgroundColor: primaryColor,
                      color: white,
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 15px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      ':hover': {
                        backgroundColor: '#1a5fb4'
                      }
                    }}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section style={{ 
          marginBottom: '3rem',
          backgroundColor: white,
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: textDark,
            fontWeight: '600',
            textAlign: 'center'
          }}>How It Works</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            {[
              { icon: <FaSearch size={30} />, title: 'Find a Doctor', desc: 'Search by specialty, location, or doctor name' },
              { icon: <FaCalendarAlt size={30} />, title: 'Book Appointment', desc: 'Choose date and time that works for you' },
              { icon: <FaClock size={30} />, title: 'Get Treatment', desc: 'Visit doctor and receive medical care' }
            ].map((step, index) => (
              <div 
                key={index} 
                style={{ 
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <div style={{
                  backgroundColor: lightBackground,
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: primaryColor
                }}>
                  {step.icon}
                </div>
                <h3 style={{ 
                  marginBottom: '0.8rem',
                  color: textDark,
                  fontWeight: '500'
                }}>{step.title}</h3>
                <p style={{ 
                  color: textMuted,
                  lineHeight: '1.5'
                }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ 
          marginBottom: '3rem',
          backgroundColor: white,
          padding: '3rem 2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            marginBottom: '2rem', 
            color: textDark,
            fontWeight: '600'
          }}>What Our Patients Say</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: lightBackground,
                  padding: '2rem',
                  borderRadius: '10px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundImage: `url(${testimonial.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  margin: '0 auto 1.5rem',
                  border: `3px solid ${primaryColor}`
                }}></div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  {[...Array(5)].map((_, i) => (
                    i < testimonial.rating ? 
                    <FaStar key={i} style={{ color: '#FFD700', margin: '0 2px' }} /> : 
                    <FaRegStar key={i} style={{ color: '#FFD700', margin: '0 2px' }} />
                  ))}
                </div>
                <p style={{
                  fontStyle: 'italic',
                  color: textMuted,
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>"{testimonial.quote}"</p>
                <h4 style={{
                  marginBottom: '0.3rem',
                  color: textDark,
                  fontWeight: '500'
                }}>{testimonial.name}</h4>
                <p style={{
                  color: primaryColor,
                  fontSize: '0.9rem'
                }}>{testimonial.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section style={{ 
          marginBottom: '3rem',
          background: `linear-gradient(135deg, ${primaryColor} 0%, #1a5fb4 100%)`,
          padding: '4rem 2rem',
          borderRadius: '12px',
          textAlign: 'center',
          color: white
        }}>
          <h2 style={{ 
            marginBottom: '1rem', 
            fontWeight: '600',
            fontSize: '2rem'
          }}>Ready to Book Your Appointment?</h2>
          <p style={{ 
            marginBottom: '2rem',
            fontSize: '1.1rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Join thousands of patients who found their perfect doctor through our platform
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <button style={{
              backgroundColor: white,
              color: primaryColor,
              border: 'none',
              borderRadius: '50px',
              padding: '12px 30px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
              }
            }}>
              Sign Up Now
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: white,
              border: '2px solid white',
              borderRadius: '50px',
              padding: '12px 30px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}>
              Browse Doctors
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;