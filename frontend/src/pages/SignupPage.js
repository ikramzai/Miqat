// src/pages/SignupPage.js
import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert, ToggleButton, ButtonGroup } from 'react-bootstrap';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'patient' // 'patient' or 'doctor'
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  // Password strength validation
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("At least one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("At least one number");
    if (!/[^A-Za-z0-9]/.test(password)) errors.push("At least one special character");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    const validationErrors = {};
    if (!form.name.trim()) validationErrors.name = "Name is required";
    if (!form.email.trim()) validationErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) validationErrors.email = "Invalid email format";
    
    const passwordErrors = validatePassword(form.password);
    if (passwordErrors.length > 0) {
      validationErrors.password = passwordErrors;
    }
    
    if (form.password !== form.confirmPassword) {
      validationErrors.confirmPassword = "Passwords don't match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const endpoint = form.userType === 'doctor' 
        ? '/api/doctors/register' 
        : '/api/patients/register';
      
      const res = await axios.post(endpoint, {
        name: form.name,
        email: form.email,
        password: form.password
      });
      
      console.log('Signed up:', res.data);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Signup failed');
    }
  };

  const handleSocialLogin = (provider) => {
    // Redirect to social auth endpoint
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <Container className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4" style={{ color: '#2c3e50' }}>Create an Account</h2>
              
              {apiError && <Alert variant="danger">{apiError}</Alert>}

              {/* User Type Toggle */}
              <div className="mb-4 text-center">
                <ButtonGroup>
                  <ToggleButton
                    id="toggle-patient"
                    type="radio"
                    variant={form.userType === 'patient' ? 'primary' : 'outline-primary'}
                    checked={form.userType === 'patient'}
                    onChange={() => setForm({...form, userType: 'patient'})}
                  >
                    Patient
                  </ToggleButton>
                  <ToggleButton
                    id="toggle-doctor"
                    type="radio"
                    variant={form.userType === 'doctor' ? 'primary' : 'outline-primary'}
                    checked={form.userType === 'doctor'}
                    onChange={() => setForm({...form, userType: 'doctor'})}
                  >
                    Doctor
                  </ToggleButton>
                </ButtonGroup>
              </div>

              {/* Social Login Buttons */}
              <div className="mb-4">
                <Button 
                  variant="outline-danger" 
                  className="w-100 mb-2"
                  onClick={() => handleSocialLogin('google')}
                >
                  <FaGoogle className="me-2" /> Sign up with Google
                </Button>
                <Button 
                  variant="outline-primary" 
                  className="w-100"
                  onClick={() => handleSocialLogin('facebook')}
                >
                  <FaFacebook className="me-2" /> Sign up with Facebook
                </Button>
              </div>

              <div className="text-center text-muted mb-3">— OR —</div>

              <Form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    isInvalid={!!errors.name}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    isInvalid={!!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    isInvalid={!!errors.password}
                    required
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      <small>
                        Password must contain: {errors.password.join(', ')}
                      </small>
                    </Form.Text>
                  )}
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re-enter your password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    isInvalid={!!errors.confirmPassword}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Submit Button */}
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2"
                  style={{ backgroundColor: '#3498db', border: 'none' }}
                >
                  Sign Up
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p className="text-muted">Already have an account? <a href="/login" style={{ color: '#3498db' }}>Log In</a></p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default SignupPage;