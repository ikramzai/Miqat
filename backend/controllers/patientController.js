const Patient = require("../models/Patient");
const jwt = require("jsonwebtoken");
const { createNotification } = require("./notificationController");
const Notification = require("../models/Notification");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id, role: "patient" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register Patient
exports.registerPatient = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const exists = await Patient.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Patient already exists." });
    }

    const patient = await Patient.create({ name, email, password });

    if (!patient) {
      return res.status(500).json({ message: "Patient creation failed." });
    }

    return res.status(201).json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      token: generateToken(patient._id),
    });
  } catch (error) {
    console.error("❌ Error registering patient:", error.message);
    return res
      .status(500)
      .json({ message: "Server error during registration." });
  }
};

// Login Patient
exports.loginPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });
    if (patient && (await patient.matchPassword(password))) {
      if (!patient.hasLoggedInBefore) {
        await createNotification({
          user: patient._id,
          userType: "patient",
          message: "👋 Welcome to Miqat! We're glad to have you.",
          type: "welcome",
        });
        patient.hasLoggedInBefore = true;
        await patient.save();
      }
      res.json({
        _id: patient._id,
        name: patient.name,
        email: patient.email,
        token: generateToken(patient._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// Get All Patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
};

// Get Patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
};

// Get Current Patient Profile
exports.getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      location: patient.location,
      profilePicture: patient.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// Update Patient Profile
exports.updatePatientProfile = async (req, res) => {
  const { name, email, phone, location } = req.body;

  try {
    const patient = await Patient.findById(req.user._id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // Update fields only if provided
    if (name !== undefined) patient.name = name;
    if (email !== undefined) patient.email = email;
    if (phone !== undefined) patient.phone = phone;
    if (location !== undefined) patient.location = location;

    // Handle profile picture upload
    if (req.file) {
      patient.profilePicture = `/uploads/${req.file.filename}`;
    }

    const updated = await patient.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      location: updated.location,
      profilePicture: updated.profilePicture,
    });
  } catch (error) {
    console.error("❌ Patient profile update error:", error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Delete Patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await patient.deleteOne(); // more explicit than remove()

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("❌ Delete patient error:", error); // this will print in your terminal
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
