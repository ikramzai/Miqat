const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id, role: 'doctor' }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register
exports.registerDoctor = async (req, res) => {
  const { name, email, password, specialty } = req.body;
  try {
    const exists = await Doctor.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Doctor already exists' });

    const doctor = await Doctor.create({ name, email, password, specialty });

    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      token: generateToken(doctor._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

// Login
exports.loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (doctor && await doctor.matchPassword(password)) {
      res.json({
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialty: doctor.specialty,
        token: generateToken(doctor._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error });
  }
};

// Update profile
exports.updateDoctorProfile = async (req, res) => {
  const { name, email, specialty, location, fees, image } = req.body;
  try {
    const doctor = await Doctor.findById(req.user._id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    doctor.name = name || doctor.name;
    doctor.email = email || doctor.email;
    doctor.specialty = specialty || doctor.specialty;
    doctor.location = location || doctor.location;
    doctor.fees = fees || doctor.fees;
    doctor.image = image || doctor.image;

    const updated = await doctor.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
};

// Get current doctor profile
exports.getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user._id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      location: doctor.location,
      fees: doctor.fees,
      image: doctor.image,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user._id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    await Doctor.deleteOne({ _id: req.user._id }); // safer alternative to doctor.remove()

    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting doctor:', error); // Log error to console
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};

