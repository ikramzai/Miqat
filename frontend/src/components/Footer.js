import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const primaryColor = '#2a7de1';
  const white = '#ffffff';
  const textDark = '#333333';
  const textMuted = '#666666';

  return (
    <footer style={{
      backgroundColor: white,
      borderTop: '1px solid #eee',
      padding: '2rem 1rem',
      marginTop: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem'
      }}>
        {/* Column 1: About */}
        <div>
          <h3 style={{ color: textDark, marginBottom: '1rem' }}>About MiQat</h3>
          <p style={{ color: textMuted, lineHeight: '1.6' }}>
            Connecting patients with the best healthcare providers in your area.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="#" style={{ color: textMuted }}><FaFacebook /></a>
            <a href="#" style={{ color: textMuted }}><FaTwitter /></a>
            <a href="#" style={{ color: textMuted }}><FaInstagram /></a>
            <a href="#" style={{ color: textMuted }}><FaLinkedin /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 style={{ color: textDark, marginBottom: '1rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/doctors" style={{ color: textMuted, textDecoration: 'none' }}>Find Doctors</Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/clinics" style={{ color: textMuted, textDecoration: 'none' }}>Clinics</Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/specialties" style={{ color: textMuted, textDecoration: 'none' }}>Specialties</Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/about" style={{ color: textMuted, textDecoration: 'none' }}>About Us</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 style={{ color: textDark, marginBottom: '1rem' }}>Contact Us</h3>
          <address style={{ color: textMuted, fontStyle: 'normal', lineHeight: '1.6' }}>
            <p>123 Medical Drive</p>
            <p>Agadir, Morocco</p>
            <p>Email: info@miqat.com</p>
            <p>Phone: +212 1234 5678</p>
          </address>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 style={{ color: textDark, marginBottom: '1rem' }}>Newsletter</h3>
          <p style={{ color: textMuted, marginBottom: '1rem' }}>
            Subscribe to get updates on health tips and new features.
          </p>
          <div style={{ display: 'flex' }}>
            <input
              type="email"
              placeholder="Your email"
              style={{
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px 0 0 4px',
                flex: 1,
                outline: 'none'
              }}
            />
            <button style={{
              backgroundColor: primaryColor,
              color: white,
              border: 'none',
              padding: '0 1rem',
              borderRadius: '0 4px 4px 0',
              cursor: 'pointer'
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        textAlign: 'center',
        marginTop: '2rem',
        paddingTop: '1rem',
        borderTop: '1px solid #eee',
        color: textMuted,
        fontSize: '0.9rem'
      }}>
        © {new Date().getFullYear()} MiQat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;