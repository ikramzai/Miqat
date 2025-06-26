import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaSearch, FaUserCircle } from 'react-icons/fa';
import { MdMedicalServices, MdPersonSearch, MdInfo } from 'react-icons/md';

const Header = () => {
  const primaryColor = '#2a7de1';
  const white = '#ffffff';
  const textDark = '#333333';

  return (
    <header style={{
      backgroundColor: white,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo with Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaHeartbeat style={{ 
            color: primaryColor, 
            fontSize: '1.8rem',
            marginRight: '0.5rem'
          }} />
          <Link to="/" style={{
            textDecoration: 'none',
            color: textDark,
            fontWeight: 'bold',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            MiQat
          </Link>
        </div>

        {/* Navigation Links with Icons */}
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{
            textDecoration: 'none',
            color: textDark,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontWeight: '500'
          }}>
            <MdMedicalServices /> Home
          </Link>
          
          <Link to="/services" style={{
            textDecoration: 'none',
            color: textDark,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontWeight: '500'
          }}>
            <MdMedicalServices /> Services
          </Link>
          
          <Link to="/doctors" style={{
            textDecoration: 'none',
            color: textDark,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontWeight: '500'
          }}>
            <MdPersonSearch /> Find a Doctor
          </Link>
          
          <Link to="/about" style={{
            textDecoration: 'none',
            color: textDark,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontWeight: '500'
          }}>
            <MdInfo /> About Us
          </Link>
        </nav>

        {/* User Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaSearch style={{ 
            color: textDark,
            cursor: 'pointer',
            fontSize: '1.2rem'
          }} />
          <FaUserCircle style={{ 
            color: textDark,
            cursor: 'pointer',
            fontSize: '1.5rem'
          }} />
        </div>
      </div>
    </header>
  );
};

export default Header;