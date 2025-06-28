// import React, { useState, useEffect } from 'react';
// import { 
//   FaUserCircle, FaCalendarAlt, FaClock, FaStar, FaRegStar,
//   FaCommentAlt, FaEdit, FaEllipsisV, FaCheck, FaTimes,
//   FaLanguage, FaBriefcaseMedical, FaHistory, FaCog, FaBell,
//   FaSearch, FaMapMarkerAlt, FaMoneyBillWave, FaSlidersH
// } from 'react-icons/fa';
// import { IoMdNotificationsOutline } from 'react-icons/io';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';

// const DoctorPage = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [availability, setAvailability] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     specialty: '',
//     location: '',
//     fees: '',
//     image: ''
//   });
//   const navigate = useNavigate();

//   // Fetch doctor data
//   useEffect(() => {
//     const fetchDoctorData = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem('token');
        
//         const [profileRes, appointmentsRes] = await Promise.all([
//           axios.get('/api/doctors/profile/me', {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           axios.get('/api/appointments', {
//             headers: { Authorization: `Bearer ${token}` }
//           })
//         ]);

//         setDoctor(profileRes.data);
//         setAppointments(appointmentsRes.data);
//         setFormData({
//           name: profileRes.data.name,
//           specialty: profileRes.data.specialty,
//           location: profileRes.data.location || '',
//           fees: profileRes.data.fees || '',
//           image: profileRes.data.image || ''
//         });
        
//         // Format availability slots
//         if (profileRes.data.availableSlots) {
//           const formattedSlots = profileRes.data.availableSlots.reduce((acc, slot) => {
//             const date = moment(slot).format('YYYY-MM-DD');
//             const time = moment(slot).format('h:mm A');
            
//             const existingDay = acc.find(item => item.day === date);
//             if (existingDay) {
//               existingDay.slots.push(time);
//             } else {
//               acc.push({ day: date, slots: [time] });
//             }
            
//             return acc;
//           }, []);
          
//           setAvailability(formattedSlots);
//         }
//       } catch (err) {
//         if (err.response?.status === 401) {
//           navigate('/login');
//         } else {
//           setError(err.response?.data?.message || 'Failed to fetch data');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctorData();
//   }, [navigate]);

//   // Handle form changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Update profile
//   const handleUpdateProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.put('/api/doctors/profile/me', formData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setDoctor(res.data);
//       setEditMode(false);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Update failed');
//     }
//   };

//   // Appointment actions
//   const handleAppointmentAction = async (id, action) => {
//     try {
//       const token = localStorage.getItem('token');
//       let res;
      
//       if (action === 'approve') {
//         res = await axios.patch(`/api/appointments/${id}/approve`, {}, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       } else if (action === 'reject') {
//         res = await axios.patch(`/api/appointments/${id}/reject`, {}, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       } else if (action === 'reschedule') {
//         // Implement reschedule logic
//       }
      
//       if (res) {
//         setAppointments(appointments.map(appt => 
//           appt._id === id ? res.data : appt
//         ));
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Action failed');
//     }
//   };

//   // Manage availability
//   const handleAvailabilityUpdate = async (newSlots) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('/api/availability', { slots: newSlots }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAvailability(newSlots);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update availability');
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh' 
//       }}>
//         <div className="spinner"></div>
//         <p>Loading your dashboard...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
//         <h2>Error Loading Data</h2>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   if (!doctor) {
//     return <div>No doctor data found</div>;
//   }

//   return (
//     <div className="doctor-page" style={{
//       backgroundColor: '#f8f9fa',
//       minHeight: '100vh',
//       padding: '20px'
//     }}>
//       {/* Header */}
//       <header style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '30px',
//         backgroundColor: 'white',
//         padding: '15px 20px',
//         borderRadius: '10px',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//       }}>
//         <h1 style={{ 
//           color: '#2a7de1',
//           margin: 0,
//           fontSize: '1.5rem'
//         }}>MediBook Pro</h1>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//           <button style={{
//             backgroundColor: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             color: '#666',
//             fontSize: '1.2rem',
//             position: 'relative'
//           }}>
//             <IoMdNotificationsOutline />
//             <span style={{
//               position: 'absolute',
//               top: '-5px',
//               right: '-5px',
//               backgroundColor: '#f44336',
//               color: 'white',
//               borderRadius: '50%',
//               width: '18px',
//               height: '18px',
//               fontSize: '0.7rem',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}>3</span>
//           </button>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <img 
//               src={doctor.image || '/images/default-avatar.jpg'} 
//               alt={doctor.name} 
//               style={{
//                 width: '40px',
//                 height: '40px',
//                 borderRadius: '50%',
//                 objectFit: 'cover'
//               }}
//             />
//             <span style={{ fontWeight: '500' }}>{doctor.name.split(' ')[0]}</span>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main style={{
//         display: 'grid',
//         gridTemplateColumns: '250px 1fr',
//         gap: '20px'
//       }}>
//         {/* Sidebar */}
//         <aside style={{
//           backgroundColor: 'white',
//           borderRadius: '10px',
//           padding: '20px',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//           height: 'fit-content'
//         }}>
//           <div style={{ 
//             display: 'flex', 
//             flexDirection: 'column', 
//             alignItems: 'center',
//             marginBottom: '20px'
//           }}>
//             <img 
//               src={doctor.image || '/images/default-avatar.jpg'} 
//               alt={doctor.name}
//               style={{
//                 width: '120px',
//                 height: '120px',
//                 borderRadius: '50%',
//                 objectFit: 'cover',
//                 border: '3px solid #e8f4fc',
//                 marginBottom: '15px'
//               }}
//             />
//             <h2 style={{ 
//               margin: '0 0 5px',
//               color: '#333',
//               textAlign: 'center'
//             }}>{doctor.name}</h2>
//             <p style={{ 
//               margin: 0,
//               color: '#2a7de1',
//               fontWeight: '500',
//               textAlign: 'center'
//             }}>{doctor.specialty}</p>
//           </div>

//           <nav>
//             <ul style={{
//               listStyle: 'none',
//               padding: 0,
//               margin: 0,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '10px'
//             }}>
//               {[
//                 { id: 'profile', icon: <FaUserCircle />, label: 'Profile' },
//                 { id: 'schedule', icon: <FaCalendarAlt />, label: 'Schedule' },
//                 { id: 'appointments', icon: <FaClock />, label: 'Appointments' },
//                 { id: 'patients', icon: <FaBriefcaseMedical />, label: 'Patients' },
//                 { id: 'reviews', icon: <FaCommentAlt />, label: 'Reviews' },
//                 { id: 'settings', icon: <FaCog />, label: 'Settings' }
//               ].map(item => (
//                 <li key={item.id}>
//                   <button
//                     onClick={() => setActiveTab(item.id)}
//                     style={{
//                       width: '100%',
//                       textAlign: 'left',
//                       padding: '12px 15px',
//                       borderRadius: '8px',
//                       border: 'none',
//                       backgroundColor: activeTab === item.id ? '#e8f4fc' : 'transparent',
//                       color: activeTab === item.id ? '#2a7de1' : '#333',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '10px',
//                       cursor: 'pointer',
//                       transition: 'all 0.2s ease',
//                       fontWeight: activeTab === item.id ? '500' : '400'
//                     }}
//                   >
//                     <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
//                     {item.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </aside>

//         {/* Content Area */}
//         <div style={{
//           backgroundColor: 'white',
//           borderRadius: '10px',
//           padding: '25px',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//         }}>
//           {/* Profile Tab */}
//           {activeTab === 'profile' && (
//             <div>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '20px'
//               }}>
//                 <h2 style={{ color: '#333', margin: 0 }}>Professional Profile</h2>
//                 {!editMode ? (
//                   <button 
//                     onClick={() => setEditMode(true)}
//                     style={{
//                       backgroundColor: '#2a7de1',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '8px',
//                       padding: '8px 15px',
//                       cursor: 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '8px',
//                       transition: 'all 0.2s ease'
//                     }}
//                   >
//                     <FaEdit /> Edit Profile
//                   </button>
//                 ) : (
//                   <div style={{ display: 'flex', gap: '10px' }}>
//                     <button 
//                       onClick={handleUpdateProfile}
//                       style={{
//                         backgroundColor: '#4CAF50',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '8px',
//                         padding: '8px 15px',
//                         cursor: 'pointer'
//                       }}
//                     >
//                       Save Changes
//                     </button>
//                     <button 
//                       onClick={() => setEditMode(false)}
//                       style={{
//                         backgroundColor: '#f44336',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '8px',
//                         padding: '8px 15px',
//                         cursor: 'pointer'
//                       }}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr',
//                 gap: '30px',
//                 marginBottom: '30px'
//               }}>
//                 <div>
//                   <h3 style={{ 
//                     color: '#2a7de1',
//                     marginBottom: '15px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '10px'
//                   }}>
//                     <FaUserCircle /> Basic Information
//                   </h3>
                  
//                   {editMode ? (
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                       <div>
//                         <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Full Name</label>
//                         <input
//                           type="text"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleInputChange}
//                           style={{
//                             width: '100%',
//                             padding: '8px 12px',
//                             border: '1px solid #ddd',
//                             borderRadius: '4px'
//                           }}
//                         />
//                       </div>
//                       <div>
//                         <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Specialty</label>
//                         <input
//                           type="text"
//                           name="specialty"
//                           value={formData.specialty}
//                           onChange={handleInputChange}
//                           style={{
//                             width: '100%',
//                             padding: '8px 12px',
//                             border: '1px solid #ddd',
//                             borderRadius: '4px'
//                           }}
//                         />
//                       </div>
//                       <div>
//                         <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Profile Image URL</label>
//                         <input
//                           type="text"
//                           name="image"
//                           value={formData.image}
//                           onChange={handleInputChange}
//                           style={{
//                             width: '100%',
//                             padding: '8px 12px',
//                             border: '1px solid #ddd',
//                             borderRadius: '4px'
//                           }}
//                         />
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>
//                         {doctor.bio || 'No bio provided'}
//                       </p>
//                       <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
//                         <FaMapMarkerAlt style={{ color: '#666' }} />
//                         <span style={{ color: '#666' }}>{doctor.location || 'Location not specified'}</span>
//                       </div>
//                       <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                         <FaMoneyBillWave style={{ color: '#666' }} />
//                         <span style={{ color: '#666' }}>
//                           {doctor.fees ? `$${doctor.fees} per consultation` : 'Fees not specified'}
//                         </span>
//                       </div>
//                     </>
//                   )}
//                 </div>
                
//                 <div>
//                   <h3 style={{ 
//                     color: '#2a7de1',
//                     marginBottom: '15px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '10px'
//                   }}>
//                     <FaSlidersH /> Professional Details
//                   </h3>
                  
//                   {editMode ? (
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                       <div>
//                         <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Location</label>
//                         <input
//                           type="text"
//                           name="location"
//                           value={formData.location}
//                           onChange={handleInputChange}
//                           style={{
//                             width: '100%',
//                             padding: '8px 12px',
//                             border: '1px solid #ddd',
//                             borderRadius: '4px'
//                           }}
//                         />
//                       </div>
//                       <div>
//                         <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Consultation Fees ($)</label>
//                         <input
//                           type="number"
//                           name="fees"
//                           value={formData.fees}
//                           onChange={handleInputChange}
//                           style={{
//                             width: '100%',
//                             padding: '8px 12px',
//                             border: '1px solid #ddd',
//                             borderRadius: '4px'
//                           }}
//                         />
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <div style={{ marginBottom: '20px' }}>
//                         <h4 style={{ color: '#666', marginBottom: '10px' }}>Years of Experience</h4>
//                         <div style={{
//                           backgroundColor: '#e8f4fc',
//                           color: '#2a7de1',
//                           width: 'fit-content',
//                           padding: '5px 15px',
//                           borderRadius: '20px',
//                           fontWeight: 'bold'
//                         }}>
//                           {doctor.yearsOfExperience || 'Not specified'} years
//                         </div>
//                       </div>
                      
//                       <div>
//                         <h4 style={{ color: '#666', marginBottom: '10px' }}>Available For</h4>
//                         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
//                           {doctor.availableFor?.map((service, index) => (
//                             <span key={index} style={{
//                               backgroundColor: '#e8f4fc',
//                               color: '#2a7de1',
//                               padding: '5px 10px',
//                               borderRadius: '20px',
//                               fontSize: '0.9rem'
//                             }}>
//                               {service}
//                             </span>
//                           )) || 'No services specified'}
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Schedule Tab */}
//           {activeTab === 'schedule' && (
//             <div>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '20px'
//               }}>
//                 <h2 style={{ 
//                   color: '#333',
//                   margin: 0,
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px'
//                 }}>
//                   <FaCalendarAlt /> My Schedule
//                 </h2>
//                 <button style={{
//                   backgroundColor: '#2a7de1',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '8px',
//                   padding: '8px 15px',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   fontSize: '0.9rem',
//                   transition: 'all 0.2s ease'
//                 }}>
//                   <FaEdit /> Manage Availability
//                 </button>
//               </div>
              
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//                 gap: '20px',
//                 marginBottom: '30px'
//               }}>
//                 {availability.length > 0 ? (
//                   availability.map((day, index) => (
//                     <div key={index} style={{
//                       backgroundColor: '#f8f9fa',
//                       borderRadius: '10px',
//                       padding: '15px',
//                       boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
//                     }}>
//                       <h3 style={{ 
//                         margin: '0 0 15px',
//                         color: '#2a7de1',
//                         textAlign: 'center'
//                       }}>{moment(day.day).format('dddd, MMM D')}</h3>
//                       <div style={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         gap: '10px'
//                       }}>
//                         {day.slots.map((slot, slotIndex) => (
//                           <div key={slotIndex} style={{
//                             backgroundColor: 'white',
//                             borderRadius: '5px',
//                             padding: '8px',
//                             textAlign: 'center',
//                             fontSize: '0.9rem',
//                             boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//                           }}>
//                             {slot}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p style={{ color: '#666', gridColumn: '1 / -1', textAlign: 'center' }}>
//                     No availability slots set. Click "Manage Availability" to add slots.
//                   </p>
//                 )}
//               </div>
              
//               <h3 style={{ 
//                 color: '#333',
//                 marginBottom: '15px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px'
//               }}>
//                 <FaClock /> Upcoming Appointments
//               </h3>
//               <div style={{
//                 backgroundColor: '#f8f9fa',
//                 borderRadius: '10px',
//                 padding: '15px'
//               }}>
//                 {appointments.filter(a => a.status === 'confirmed').slice(0, 3).length > 0 ? (
//                   appointments.filter(a => a.status === 'confirmed').slice(0, 3).map(appt => (
//                     <div key={appt._id} style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                       padding: '10px 0',
//                       borderBottom: '1px solid #eee',
//                       ':last-child': {
//                         borderBottom: 'none'
//                       }
//                     }}>
//                       <div>
//                         <p style={{ margin: '0 0 5px', fontWeight: '500' }}>{appt.patient?.name || 'Unknown Patient'}</p>
//                         <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
//                           {moment(appt.date).format('MMM D, YYYY')} at {moment(appt.time).format('h:mm A')}
//                         </p>
//                       </div>
//                       <button style={{
//                         backgroundColor: 'transparent',
//                         border: '1px solid #2a7de1',
//                         color: '#2a7de1',
//                         borderRadius: '5px',
//                         padding: '5px 10px',
//                         cursor: 'pointer',
//                         fontSize: '0.8rem',
//                         transition: 'all 0.2s ease'
//                       }}>
//                         Details
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <p style={{ color: '#666', textAlign: 'center' }}>No upcoming appointments</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Appointments Tab */}
//           {activeTab === 'appointments' && (
//             <div>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '20px'
//               }}>
//                 <h2 style={{ 
//                   color: '#333',
//                   margin: 0,
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px'
//                 }}>
//                   <FaClock /> Appointments
//                 </h2>
//                 <div style={{ display: 'flex', gap: '10px' }}>
//                   <div style={{
//                     position: 'relative',
//                     display: 'flex',
//                     alignItems: 'center'
//                   }}>
//                     <FaSearch style={{
//                       position: 'absolute',
//                       left: '10px',
//                       color: '#666'
//                     }} />
//                     <input 
//                       type="text" 
//                       placeholder="Search appointments..."
//                       style={{
//                         padding: '8px 8px 8px 35px',
//                         border: '1px solid #ddd',
//                         borderRadius: '8px',
//                         fontSize: '0.9rem',
//                         outline: 'none'
//                       }}
//                     />
//                   </div>
//                   <select style={{
//                     padding: '8px 12px',
//                     borderRadius: '8px',
//                     border: '1px solid #ddd',
//                     backgroundColor: 'white',
//                     cursor: 'pointer',
//                     fontSize: '0.9rem'
//                   }}>
//                     <option>All Status</option>
//                     <option>Confirmed</option>
//                     <option>Pending</option>
//                     <option>Cancelled</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div style={{
//                 display: 'flex',
//                 borderBottom: '1px solid #eee',
//                 marginBottom: '15px'
//               }}>
//                 {['Upcoming', 'Pending', 'Completed', 'Cancelled'].map(tab => (
//                   <button
//                     key={tab}
//                     style={{
//                       padding: '10px 20px',
//                       backgroundColor: 'transparent',
//                       border: 'none',
//                       borderBottom: tab === 'Upcoming' ? '2px solid #2a7de1' : '2px solid transparent',
//                       cursor: 'pointer',
//                       fontWeight: tab === 'Upcoming' ? '500' : '400',
//                       color: tab === 'Upcoming' ? '#2a7de1' : '#666'
//                     }}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>
              
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '10px'
//               }}>
//                 {appointments.length > 0 ? (
//                   appointments.map(appt => (
//                     <div key={appt._id} style={{
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                       padding: '15px',
//                       backgroundColor: '#f8f9fa',
//                       borderRadius: '8px',
//                       transition: 'all 0.2s ease'
//                     }}>
//                       <div style={{ flex: 2 }}>
//                         <h4 style={{ margin: '0 0 5px', color: '#333' }}>
//                           {appt.patient?.name || 'Unknown Patient'}
//                         </h4>
//                         <p style={{ margin: '0 0 5px', color: '#666', fontSize: '0.9rem' }}>
//                           {moment(appt.date).format('MMM D, YYYY')} at {moment(appt.time).format('h:mm A')}
//                         </p>
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <span style={{
//                           padding: '5px 10px',
//                           borderRadius: '20px',
//                           backgroundColor: 
//                             appt.status === 'confirmed' ? '#E8F5E9' :
//                             appt.status === 'pending' ? '#FFF8E1' : '#FFEBEE',
//                           color: 
//                             appt.status === 'confirmed' ? '#2E7D32' :
//                             appt.status === 'pending' ? '#FF8F00' : '#C62828',
//                           fontSize: '0.8rem',
//                           fontWeight: '500',
//                           textTransform: 'capitalize'
//                         }}>
//                           {appt.status}
//                         </span>
//                       </div>
//                       <div style={{ display: 'flex', gap: '8px' }}>
//                         {appt.status === 'pending' && (
//                           <>
//                             <button 
//                               onClick={() => handleAppointmentAction(appt._id, 'approve')}
//                               style={{
//                                 backgroundColor: '#4CAF50',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '5px',
//                                 padding: '5px 10px',
//                                 cursor: 'pointer',
//                                 fontSize: '0.8rem',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '5px'
//                               }}
//                             >
//                               <FaCheck size={12} /> Approve
//                             </button>
//                             <button 
//                               onClick={() => handleAppointmentAction(appt._id, 'reject')}
//                               style={{
//                                 backgroundColor: '#f44336',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '5px',
//                                 padding: '5px 10px',
//                                 cursor: 'pointer',
//                                 fontSize: '0.8rem',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '5px'
//                               }}
//                             >
//                               <FaTimes size={12} /> Reject
//                             </button>
//                           </>
//                         )}
//                         {appt.status === 'confirmed' && (
//                           <>
//                             <button 
//                               onClick={() => handleAppointmentAction(appt._id, 'reschedule')}
//                               style={{
//                                 backgroundColor: '#2196F3',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '5px',
//                                 padding: '5px 10px',
//                                 cursor: 'pointer',
//                                 fontSize: '0.8rem',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '5px'
//                               }}
//                             >
//                               <FaEdit size={12} /> Reschedule
//                             </button>
//                             <button 
//                               onClick={() => handleAppointmentAction(appt._id, 'cancel')}
//                               style={{
//                                 backgroundColor: '#f44336',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '5px',
//                                 padding: '5px 10px',
//                                 cursor: 'pointer',
//                                 fontSize: '0.8rem',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '5px'
//                               }}
//                             >
//                               <FaTimes size={12} /> Cancel
//                             </button>
//                           </>
//                         )}
//                         <button style={{
//                           backgroundColor: 'transparent',
//                           border: 'none',
//                           color: '#666',
//                           cursor: 'pointer',
//                           fontSize: '1rem'
//                         }}>
//                           <FaEllipsisV />
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p style={{ color: '#666', textAlign: 'center' }}>No appointments found</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Other tabs */}
//           {activeTab === 'patients' && (
//             <div>
//               <h2 style={{ 
//                 color: '#333',
//                 marginBottom: '20px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px'
//               }}>
//                 <FaBriefcaseMedical /> My Patients
//               </h2>
//               <p style={{ color: '#666' }}>Patient history and records will be displayed here.</p>
//             </div>
//           )}

//           {activeTab === 'reviews' && (
//             <div>
//               <h2 style={{ 
//                 color: '#333',
//                 marginBottom: '20px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px'
//               }}>
//                 <FaCommentAlt /> Patient Reviews
//               </h2>
//               <p style={{ color: '#666' }}>Patient reviews and ratings will be displayed here.</p>
//             </div>
//           )}

//           {activeTab === 'settings' && (
//             <div>
//               <h2 style={{ 
//                 color: '#333',
//                 marginBottom: '20px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px'
//               }}>
//                 <FaCog /> Account Settings
//               </h2>
//               <p style={{ color: '#666' }}>Account and notification settings will be displayed here.</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DoctorPage;