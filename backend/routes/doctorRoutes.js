const express = require('express');
const router = express.Router();
const {
  registerDoctor,
  loginDoctor,
  getDoctorProfile,
  updateDoctorProfile,
  getAllDoctors,
  getDoctorById,
  deleteDoctor
} = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerDoctor);
router.post('/login', loginDoctor);
router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.get('/profile/me', protect, getDoctorProfile);
router.put('/profile/me', protect, updateDoctorProfile);
router.delete('/profile/me', protect, deleteDoctor);

module.exports = router;