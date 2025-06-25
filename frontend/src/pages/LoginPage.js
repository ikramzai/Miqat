import React, { useState } from 'react';
import api from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('doctor'); // or 'patient'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = role === 'doctor' ? '/doctors/login' : '/patients/login';
      const response = await api.post(endpoint, { email, password });
      console.log('Login successful:', response.data);
      alert(`Welcome ${response.data.user?.name || response.data.name}`);
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control"
                 value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control"
                 value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
