const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");
const { createNotification } = require("./notificationController");
const Notification = require("../models/Notification");

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id, role: "doctor" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register
exports.registerDoctor = async (req, res) => {
  const { name, email, password, specialty } = req.body;

  if (!name || !email || !password || !specialty) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const exists = await Doctor.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Doctor already exists." });
    }

    const doctor = await Doctor.create({ name, email, password, specialty });

    if (!doctor) {
      return res.status(500).json({ message: "Doctor creation failed." });
    }

    return res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      token: generateToken(doctor._id),
    });
  } catch (error) {
    console.error("❌ Error registering doctor:", error.message);
    return res
      .status(500)
      .json({ message: "Server error during registration." });
  }
};

// Login
exports.loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (doctor && (await doctor.matchPassword(password))) {
      console.log(
        "[DEBUG] loginDoctor: Checking for existing welcome notification for doctor",
        doctor._id
      );
      const existingWelcome = await Notification.findOne({
        user: doctor._id,
        type: "welcome",
      });
      if (!existingWelcome) {
        console.log(
          "[DEBUG] loginDoctor: Creating welcome notification for doctor",
          doctor._id
        );
        await createNotification({
          user: doctor._id,
          message: `Welcome back, ${doctor.name || "Doctor"}!`,
          type: "welcome",
        });
      } else {
        console.log(
          "[DEBUG] loginDoctor: Welcome notification already exists for doctor",
          doctor._id
        );
      }
      res.json({
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialty: doctor.specialty,
        token: generateToken(doctor._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error });
  }
};

// Update profile
exports.updateDoctorProfile = async (req, res) => {
  const { name, email, specialty, location, fees, phone, availableSlots } =
    req.body;
  try {
    const doctor = await Doctor.findById(req.user._id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Track previous slots for comparison
    const prevSlots = doctor.availableSlots
      ? doctor.availableSlots.map((d) => d.toISOString())
      : [];

    doctor.name = name || doctor.name;
    doctor.email = email || doctor.email;
    doctor.specialty = specialty || doctor.specialty;
    doctor.location = location || doctor.location;
    doctor.fees = fees || doctor.fees;
    doctor.phone = phone || doctor.phone;
    if (availableSlots) doctor.availableSlots = availableSlots;
    if (req.file) {
      doctor.profilePicture = `/uploads/${req.file.filename}`;
    }

    const updated = await doctor.save();

    // Notify patients if availableSlots changed
    if (
      availableSlots &&
      JSON.stringify(prevSlots) !== JSON.stringify(availableSlots)
    ) {
      const Appointment = require("../models/Appointment");
      const futureAppointments = await Appointment.find({
        doctor: doctor._id,
        date: { $gte: new Date() },
        status: { $nin: ["cancelled"] },
      }).populate("patient", "name email");
      for (const appt of futureAppointments) {
        await createNotification({
          user: appt.patient._id,
          message: `Doctor ${doctor.name}'s availability has changed. Please review your upcoming appointment(s).`,
          type: "availability_changed",
          relatedEntity: appt._id,
        });
      }
    }

    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      specialty: updated.specialty,
      location: updated.location,
      fees: updated.fees,
      profilePicture: updated.profilePicture,
      phone: updated.phone,
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

// Get current doctor profile
exports.getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user._id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      location: doctor.location,
      fees: doctor.fees,
      profilePicture: doctor.profilePicture,
      phone: doctor.phone,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user._id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await Doctor.deleteOne({ _id: req.user._id }); // safer alternative to doctor.remove()

    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting doctor:", error); // Log error to console
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

// Search doctors with filters
exports.searchDoctors = async (req, res) => {
  try {
    const { specialty, location, rating, availability, search } = req.query;

    let query = {};

    // Add filters to query
    if (specialty) {
      query.specialty = { $regex: specialty, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialty: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const doctors = await Doctor.find(query).select("-password");

    // Filter by rating if specified
    let filteredDoctors = doctors;
    if (rating) {
      filteredDoctors = doctors.filter(
        (doctor) => (doctor.rating || 0) >= parseInt(rating)
      );
    }

    res.json(filteredDoctors);
  } catch (error) {
    console.error("❌ Error searching doctors:", error);
    res
      .status(500)
      .json({ message: "Error searching doctors", error: error.message });
  }
};
