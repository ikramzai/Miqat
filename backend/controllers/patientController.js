const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id, role: 'patient' }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register Patient
exports.registerPatient = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await Patient.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Patient already exists' });

    const patient = await Patient.create({ name, email, password });

    res.status(201).json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      token: generateToken(patient._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

// Login Patient
exports.loginPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });
    if (patient && await patient.matchPassword(password)) {
      res.json({
        _id: patient._id,
        name: patient.name,
        email: patient.email,
        token: generateToken(patient._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

// Get All Patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
};

// Get Patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error });
  }
};

// Get Current Patient Profile
exports.getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

// Update Patient Profile
exports.updatePatientProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const patient = await Patient.findById(req.user._id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    patient.name = name || patient.name;
    patient.email = email || patient.email;

    const updated = await patient.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
};

// Delete Patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    await patient.deleteOne(); // more explicit than remove()

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('❌ Delete patient error:', error); // this will print in your terminal
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};
