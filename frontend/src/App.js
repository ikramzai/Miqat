import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import SearchDoctorsPage from "./pages/SearchDoctorsPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import AppointmentsPage from "./pages/AppointmentsPage";
import ProfilePage from "./pages/ProfilePage";
import BookingPage from "./pages/BookingPage";
import ToastContainer from "./components/ToastContainer";
import React from "react";

const AppointmentDetails = () => (
  <div className="container mt-5 text-center">
    <h2>Appointment Details Coming Soon</h2>
    <p>This page will show details for a specific appointment.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search" element={<SearchDoctorsPage />} />
          <Route path="/doctor/:id" element={<DoctorProfilePage />} />

          {/* Protected Routes */}
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/appointments/:id" element={<AppointmentDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/booking/:doctorId" element={<BookingPage />} />

          {/* Add more routes as needed */}
        </Routes>
      </Layout>
      <ToastContainer />
    </Router>
  );
}

export default App;
