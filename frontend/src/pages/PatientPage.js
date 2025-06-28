import { Spinner } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaUserCircle, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaClock,
  FaStar, FaRegStar, FaHeart, FaRegHeart, FaTimes, FaEdit,
  FaBell, FaHistory, FaCog, FaCommentAlt
} from 'react-icons/fa';

const PatientPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [patient, setPatient] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const patientRes = await axios.get('http://localhost:5000/api/patient/profile/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatient(patientRes.data);

      const doctorsRes = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(doctorsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  fetchData();
}, []);

  const toggleFavorite = async (doctorId) => {
    try {
      const updated = favorites.includes(doctorId)
        ? favorites.filter(id => id !== doctorId)
        : [...favorites, doctorId];

      await axios.post('/api/patient/favorites', { doctorId });
      setFavorites(updated);
    } catch (err) {
      console.error('Failed to update favorites:', err);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(`/api/appointments/${appointmentId}`);
      setPatient((prev) => ({
        ...prev,
        upcomingAppointments: prev.upcomingAppointments.filter(a => a.id !== appointmentId)
      }));
    } catch (err) {
      console.error('Cancel failed:', err);
    }
  };

  if (!patient) return   <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
    <Spinner animation="border" variant="primary" />
  </div>;

  return (
    <div className="patient-page" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', backgroundColor: 'white', padding: '15px 20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h1 style={{ color: '#2a7de1', margin: 0, fontSize: '1.5rem' }}>Miqat</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#666', fontSize: '1.2rem' }}><FaBell /></button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={patient.avatar} alt={patient.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ fontWeight: '500' }}>{patient.name}</span>
          </div>
        </div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px' }}>
        <aside style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'dashboard', icon: <FaUserCircle />, label: 'Dashboard' },
                { id: 'book', icon: <FaSearch />, label: 'Find Doctors' },
                { id: 'appointments', icon: <FaCalendarAlt />, label: 'My Appointments' },
                { id: 'favorites', icon: <FaHeart />, label: 'Favorites' },
                { id: 'history', icon: <FaHistory />, label: 'History' },
                { id: 'settings', icon: <FaCog />, label: 'Settings' },
                { id: 'messages', icon: <FaCommentAlt />, label: 'Messages' }
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 15px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: activeTab === item.id ? '#e8f4fc' : 'transparent',
                      color: activeTab === item.id ? '#2a7de1' : '#333',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontWeight: activeTab === item.id ? '500' : '400'
                    }}>
                    <span style={{ fontSize: '1.1rem' }}>{item.icon}</span> {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{ color: '#333', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaUserCircle /> Welcome back, {patient.name}!
              </h2>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1, backgroundColor: '#e8f4fc', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                  <h3 style={{ color: '#2a7de1', margin: '0 0 10px' }}>Upcoming</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>{patient.upcomingAppointments.length}</p>
                </div>
                <div style={{ flex: 1, backgroundColor: '#e8f4fc', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                  <h3 style={{ color: '#2a7de1', margin: '0 0 10px' }}>Favorites</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>{favorites.length}</p>
                </div>
                <div style={{ flex: 1, backgroundColor: '#e8f4fc', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                  <h3 style={{ color: '#2a7de1', margin: '0 0 10px' }}>History</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>{patient.pastAppointments.length}</p>
                </div>
              </div>
            </div>
          )}

          {/* Find Doctors Tab */}
          {activeTab === 'book' && (
            <div>
              <h2 style={{ 
                color: '#333',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaSearch /> Find Doctors
              </h2>
              
              {/* Search Bar */}
              <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '25px'
              }}>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  padding: '10px 15px'
                }}>
                  <FaSearch style={{ color: '#666', marginRight: '10px' }} />
                  <input
                    type="text"
                    placeholder="Search by name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      width: '100%',
                      outline: 'none',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  padding: '10px 15px'
                }}>
                  <FaMapMarkerAlt style={{ color: '#666', marginRight: '10px' }} />
                  <input
                    type="text"
                    placeholder="Location..."
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      width: '100%',
                      outline: 'none',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <button style={{
                  backgroundColor: '#2a7de1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0 20px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    backgroundColor: '#1a5fb4'
                  }
                }}>
                  <FaSearch /> Search
                </button>
              </div>

              {/* Filters */}
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '25px',
                flexWrap: 'wrap'
              }}>
                <select style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}>
                  <option>All Specialties</option>
                  <option>Cardiology</option>
                  <option>Dermatology</option>
                  <option>Pediatrics</option>
                </select>
                <select style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}>
                  <option>Any Rating</option>
                  <option>4+ Stars</option>
                  <option>4.5+ Stars</option>
                </select>
                <select style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}>
                  <option>Any Availability</option>
                  <option>Today</option>
                  <option>This Week</option>
                </select>
              </div>

              {/* Doctors List */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                {doctors.map(doctor => (
                  <div key={doctor.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                    border: '1px solid #eee',
                    transition: 'all 0.2s ease',
                    ':hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <div style={{
                      height: '180px',
                      backgroundImage: `url(${doctor.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}>
                      <button 
                        onClick={() => toggleFavorite(doctor.id)}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(255,255,255,0.8)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '36px',
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: favorites.includes(doctor.id) ? '#f44336' : '#ccc',
                          fontSize: '1.2rem',
                          transition: 'all 0.2s ease',
                          ':hover': {
                            color: '#f44336',
                            backgroundColor: 'white'
                          }
                        }}
                      >
                        {favorites.includes(doctor.id) ? <FaHeart /> : <FaRegHeart />}
                      </button>
                    </div>
                    <div style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <h3 style={{ margin: 0, color: '#333' }}>{doctor.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <FaStar style={{ color: '#FFD700' }} />
                          <span>{doctor.rating}</span>
                        </div>
                      </div>
                      <p style={{ color: '#666', marginBottom: '10px' }}>{doctor.specialty}</p>
                      <p style={{ color: '#666', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaMapMarkerAlt /> {doctor.distance} km away
                      </p>
                      
                      <h4 style={{ margin: '0 0 10px', color: '#333', fontSize: '0.9rem' }}>Available Times:</h4>
                      <div style={{ 
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                        marginBottom: '15px'
                      }}>
                        {doctor.available.map((time, index) => (
                          <button 
                            key={index}
                            style={{
                              backgroundColor: '#e8f4fc',
                              color: '#2a7de1',
                              border: 'none',
                              borderRadius: '5px',
                              padding: '5px 10px',
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              ':hover': {
                                backgroundColor: '#2a7de1',
                                color: 'white'
                              }
                            }}
                          >
                            {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </button>
                        ))}
                      </div>
                      
                      <button style={{
                        width: '100%',
                        backgroundColor: '#2a7de1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        ':hover': {
                          backgroundColor: '#1a5fb4'
                        }
                      }}>
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Appointments Tab */}
          {activeTab === 'appointments' && (
            <div>
              <h2 style={{ 
                color: '#333',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaCalendarAlt /> My Appointments
              </h2>
              
              {/* Appointment Tabs */}
              <div style={{
                display: 'flex',
                borderBottom: '1px solid #eee',
                marginBottom: '20px'
              }}>
                {['Upcoming', 'Pending', 'Completed', 'Cancelled'].map(tab => (
                  <button
                    key={tab}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '2px solid transparent',
                      cursor: 'pointer',
                      fontWeight: '500',
                      color: '#666',
                      ':hover': {
                        color: '#2a7de1'
                      }
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Appointments List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {[...patient.upcomingAppointments, ...patient.pastAppointments].map(appointment => (
                  <div key={appointment.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                  }}>
                    <div style={{ flex: 2 }}>
                      <h3 style={{ margin: '0 0 5px', color: '#333' }}>{appointment.doctor}</h3>
                      <p style={{ margin: '0 0 5px', color: '#666' }}>{appointment.specialty}</p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 5px', color: '#666' }}>
                        <FaCalendarAlt style={{ marginRight: '5px' }} />
                        {appointment.date}
                      </p>
                      <p style={{ margin: 0, color: '#666' }}>
                        <FaClock style={{ marginRight: '5px' }} />
                        {appointment.time}
                      </p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{
                        padding: '5px 10px',
                        borderRadius: '20px',
                        backgroundColor: 
                          appointment.status === 'confirmed' ? '#E8F5E9' :
                          appointment.status === 'pending' ? '#FFF8E1' :
                          appointment.status === 'completed' ? '#E3F2FD' : '#FFEBEE',
                        color: 
                          appointment.status === 'confirmed' ? '#2E7D32' :
                          appointment.status === 'pending' ? '#FF8F00' :
                          appointment.status === 'completed' ? '#1565C0' : '#C62828',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {appointment.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #2a7de1',
                        color: '#2a7de1',
                        borderRadius: '5px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        transition: 'all 0.2s ease',
                        ':hover': {
                          backgroundColor: '#e8f4fc'
                        }
                      }}>
                        Reschedule
                      </button>
                      <button 
                        onClick={() => cancelAppointment(appointment.id)}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid #f44336',
                          color: '#f44336',
                          borderRadius: '5px',
                          padding: '5px 10px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          transition: 'all 0.2s ease',
                          ':hover': {
                            backgroundColor: '#ffebee'
                          }
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs would be implemented similarly */}
          {activeTab === 'favorites' && (
            <div>
              <h2 style={{ 
                color: '#333',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaHeart style={{ color: '#f44336' }} /> Favorite Doctors
              </h2>
              {/* Similar to favorites section in dashboard */}
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 style={{ 
                color: '#333',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaCog /> Settings
              </h2>
              {/* Profile settings form would go here */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientPage;