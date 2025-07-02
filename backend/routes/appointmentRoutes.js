const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getDoctorAppointments,
  getCurrentDoctorAppointments,
  getPatientAppointments,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/", protect, createAppointment);
router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);

// Protected routes
router.put("/:id", protect, updateAppointment);
router.put("/:id/status", protect, updateAppointmentStatus);
router.delete("/:id", protect, deleteAppointment);

// Doctor and patient specific routes
router.get("/doctor/me", protect, getCurrentDoctorAppointments);
router.get("/doctor/:doctorId", getDoctorAppointments);
router.get("/patient/me", protect, getPatientAppointments);

module.exports = router;
