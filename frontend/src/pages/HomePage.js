import React, { useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

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
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      rating: 4.9,
      reviews: 89,
      distance: 1.2,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Dr. Priya Patel',
      specialty: 'Pediatrician',
      rating: 4.7,
      reviews: 156,
      distance: 3.1,
      image: 'https://images.unsplash.com/photo-1594824475317-7e2f8e8a4d21?w=300&h=300&fit=crop&crop=face'
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
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Maria S.",
      role: "Patient",
      quote: "The booking process was incredibly smooth.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1494790108755-2616b9a06beb?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "David K.",
      role: "Patient",
      quote: "Saved me hours of waiting at the clinic!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchTerm, 'in', location);
    // Here you would integrate with your backend API
    // Example: navigate to search results page
    alert(`Searching for "${searchTerm}" in "${location}"`);
  };

  const handleBookAppointment = (doctor) => {
    console.log('Booking appointment with:', doctor.name);
    // Here you would navigate to booking page or open modal
    alert(`Booking appointment with ${doctor.name}`);
  };

  const handleSignUp = () => {
    console.log('Redirecting to signup...');
    // Here you would navigate to signup page
    alert('Redirecting to signup page...');
  };

  const handleSpecialtyClick = (specialty) => {
    console.log('Searching specialty:', specialty.name);
    // Here you would navigate to doctors filtered by specialty
    alert(`Searching for ${specialty.name} doctors...`);
  };

  return (
    <div className="home-page" style={{ backgroundColor: white, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
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
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
            flex: 1,
            minWidth: '200px'
          }}>
            <FaSearch style={{ color: textMuted, marginRight: '10px' }} />
            <input 
              type="text" 
              placeholder="Search doctors, specialties..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            flex: '0 0 auto',
            minWidth: '150px'
          }}>
            <FaMapMarkerAlt style={{ color: textMuted, marginRight: '10px' }} />
            <input 
              type="text" 
              placeholder="Location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                padding: '8px 0',
                fontSize: '1rem'
              }}
            />
          </div>
          <button 
            onClick={handleSearch}
            style={{
              backgroundColor: primaryColor,
              color: white,
              border: 'none',
              borderRadius: '50px',
              padding: '10px 25px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.target.style.backgroundColor = '#1a5fb4'}
            onMouseLeave={e => e.target.style.backgroundColor = primaryColor}
          >
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
                onClick={() => handleSpecialtyClick(specialty)}
                style={{
                  backgroundColor: white,
                  borderRadius: '10px',
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  border: '1px solid #e0e0e0',
                  color: specialty.color,
                  transform: hoveredCard === `specialty-${index}` ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredCard === `specialty-${index}` ? `0 12px 20px ${specialty.color}20` : '0 2px 8px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={() => setHoveredCard(`specialty-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
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
                  transform: hoveredCard === `feature-${index}` ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hoveredCard === `feature-${index}` ? '0 10px 20px rgba(0,0,0,0.1)' : 'none'
                }}
                onMouseEnter={() => setHoveredCard(`feature-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
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
            <button 
              onClick={() => alert('Navigating to all doctors...')}
              style={{ 
                color: primaryColor, 
                textDecoration: 'none',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >View All</button>
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
                  boxShadow: hoveredCard === `doctor-${doctor.id}` ? '0 12px 20px rgba(0,0,0,0.15)' : '0 3px 10px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  border: '1px solid #e0e0e0',
                  transform: hoveredCard === `doctor-${doctor.id}` ? 'translateY(-8px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setHoveredCard(`doctor-${doctor.id}`)}
                onMouseLeave={() => setHoveredCard(null)}
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                    <button 
                      onClick={() => alert(`Viewing ${doctor.name}'s profile...`)}
                      style={{
                        backgroundColor: white,
                        color: primaryColor,
                        border: `1px solid ${primaryColor}`,
                        borderRadius: '8px',
                        padding: '8px 15px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        flex: 1
                      }}
                      onMouseEnter={e => e.target.style.backgroundColor = lightBackground}
                      onMouseLeave={e => e.target.style.backgroundColor = white}
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => handleBookAppointment(doctor)}
                      style={{
                        backgroundColor: primaryColor,
                        color: white,
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 15px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        flex: 1
                      }}
                      onMouseEnter={e => e.target.style.backgroundColor = '#1a5fb4'}
                      onMouseLeave={e => e.target.style.backgroundColor = primaryColor}
                    >
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
                  transform: hoveredCard === `step-${index}` ? 'translateY(-5px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setHoveredCard(`step-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
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
                  transform: hoveredCard === `testimonial-${index}` ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hoveredCard === `testimonial-${index}` ? '0 10px 20px rgba(0,0,0,0.1)' : 'none'
                }}
                onMouseEnter={() => setHoveredCard(`testimonial-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
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
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={handleSignUp}
              style={{
                backgroundColor: white,
                color: primaryColor,
                border: 'none',
                borderRadius: '50px',
                padding: '12px 30px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Sign Up Now
            </button>
            <button 
              onClick={() => alert('Browsing doctors...')}
              style={{
                backgroundColor: 'transparent',
                color: white,
                border: '2px solid white',
                borderRadius: '50px',
                padding: '12px 30px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
            >
              Browse Doctors
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;