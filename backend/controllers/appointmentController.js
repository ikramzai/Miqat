const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const { createNotification } = require("./notificationController");

// Create appointment
exports.createAppointment = async (req, res) => {
  const { doctor, date, time, reason, notes } = req.body;
  const patient = req.user._id; // Get patient ID from authenticated user

  console.log("📝 Creating appointment with data:", {
    doctor,
    date,
    time,
    reason,
    notes,
    patient: patient ? "Present" : "Missing",
  });

  try {
    // Validate required fields
    if (!doctor || !date || !time) {
      console.log("❌ Missing required fields:", {
        doctor: !!doctor,
        date: !!date,
        time: !!time,
      });
      return res
        .status(400)
        .json({ message: "Doctor, date, and time are required" });
    }

    // Check if doctor exists
    const doctorExists = await Doctor.findById(doctor);

    if (!doctorExists) {
      console.log("❌ Doctor not found:", doctor);
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Convert date string to Date object
    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Check if appointment already exists for this time slot
    const existingAppointment = await Appointment.findOne({
      doctor,
      date: appointmentDate,
      time,
      status: { $nin: ["cancelled"] },
    });

    if (existingAppointment) {
      console.log("❌ Time slot already booked:", {
        doctor,
        date: appointmentDate,
        time,
      });
      return res
        .status(409)
        .json({ message: "This time slot is already booked" });
    }

    const appointmentData = {
      doctor,
      patient,
      date: appointmentDate,
      time,
      reason: reason || "",
      notes: notes || "",
      status: "pending",
    };

    console.log("✅ Creating appointment with data:", appointmentData);

    const appointment = await Appointment.create(appointmentData);

    // Notify doctor of new appointment
    await createNotification({
      user: doctorExists._id,
      userType: "doctor",
      message: `📅 New appointment booked with ${
        req.user.name || "a patient"
      } on ${date} at ${time}.`,
      type: "appointment_booked",
      relatedEntity: appointment._id,
    });

    // Notify patient of successful booking
    await createNotification({
      user: patient,
      userType: "patient",
      message: `✅ Appointment with Dr. ${doctorExists.name} confirmed for ${date} at ${time}.`,
      type: "appointment_booked",
      relatedEntity: appointment._id,
    });

    // Populate doctor and patient details
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("doctor", "name specialty")
      .populate("patient", "name email");

    console.log(
      "✅ Appointment created successfully:",
      populatedAppointment._id
    );
    res.status(201).json(populatedAppointment);
  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    res
      .status(500)
      .json({ message: "Failed to create appointment", error: error.message });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name specialty")
      .populate("patient", "name email")
      .sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
};

// Get appointments for a specific doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "name email")
      .sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    console.error("❌ Error fetching doctor appointments:", error);
    res.status(500).json({
      message: "Failed to fetch doctor appointments",
      error: error.message,
    });
  }
};

// Get appointments for the current doctor
exports.getCurrentDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id })
      .populate("patient", "name email")
      .sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    console.error("❌ Error fetching current doctor appointments:", error);
    res.status(500).json({
      message: "Failed to fetch current doctor appointments",
      error: error.message,
    });
  }
};

// Get appointments for a specific patient
exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate("doctor", "name specialty")
      .sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    console.error("❌ Error fetching patient appointments:", error);
    res.status(500).json({
      message: "Failed to fetch patient appointments",
      error: error.message,
    });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("doctor", "name specialty")
      .populate("patient", "name email");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);
  } catch (error) {
    console.error("❌ Error fetching appointment:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch appointment", error: error.message });
  }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("doctor", "name specialty")
      .populate("patient", "name email");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);
  } catch (error) {
    console.error("❌ Error updating appointment:", error);
    res
      .status(500)
      .json({ message: "Failed to update appointment", error: error.message });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "confirmed", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("doctor", "name specialty")
      .populate("patient", "name email");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    let statusMsg = "updated";
    let patientMsg = "";
    let doctorMsg = "";
    if (status === "confirmed") {
      statusMsg = "confirmed";
      patientMsg = `✔️ Dr. ${
        appointment.doctor.name
      } confirmed your appointment for ${appointment.date.toDateString()}.`;
      doctorMsg = `You confirmed the appointment with ${
        appointment.patient.name
      } on ${appointment.date.toDateString()} at ${appointment.time}.`;
    } else if (status === "cancelled") {
      statusMsg = "cancelled";
      patientMsg = `❌ Your appointment with Dr. ${appointment.doctor.name} was cancelled.`;
      doctorMsg = `❌ Appointment with ${appointment.patient.name} was cancelled.`;
    } else {
      patientMsg = `Your appointment on ${appointment.date.toDateString()} at ${
        appointment.time
      } was updated.`;
      doctorMsg = `Appointment with ${
        appointment.patient.name
      } on ${appointment.date.toDateString()} at ${
        appointment.time
      } was updated.`;
    }
    await createNotification({
      user: appointment.patient._id,
      userType: "patient",
      message: patientMsg,
      type: `appointment_${statusMsg}`,
      relatedEntity: appointment._id,
    });
    await createNotification({
      user: appointment.doctor._id,
      userType: "doctor",
      message: doctorMsg,
      type: `appointment_${statusMsg}`,
      relatedEntity: appointment._id,
    });

    res.json(appointment);
  } catch (error) {
    console.error("❌ Error updating appointment status:", error);
    res.status(500).json({
      message: "Failed to update appointment status",
      error: error.message,
    });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting appointment:", error);
    res
      .status(500)
      .json({ message: "Failed to delete appointment", error: error.message });
  }
};

// Debug endpoint to see what data is being sent
exports.debugAppointment = async (req, res) => {
  console.log("🔍 Debug - Request body:", req.body);
  console.log("🔍 Debug - Request headers:", req.headers);
  console.log("🔍 Debug - User:", req.user);

  res.json({
    message: "Debug successful",
    body: req.body,
    headers: req.headers,
    user: req.user,
  });
};

// Test endpoint to check authentication
exports.testAuth = async (req, res) => {
  console.log("🔍 Test auth - User:", req.user);
  console.log("🔍 Test auth - User ID:", req.user?._id);
  console.log("🔍 Test auth - User type:", req.user?.constructor.modelName);

  res.json({
    message: "Auth test successful",
    user: req.user
      ? {
          id: req.user._id,
          type: req.user.constructor.modelName,
          name: req.user.name,
        }
      : null,
  });
};

// Placeholder for reminders
exports.sendAppointmentReminders = async () => {
  const now = new Date();
  const soon = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
  const upcoming = await Appointment.find({
    date: { $gte: now, $lte: soon },
    status: { $nin: ["cancelled"] },
  })
    .populate("doctor", "name")
    .populate("patient", "name");
  for (const appt of upcoming) {
    // Notify patient
    await createNotification({
      user: appt.patient._id,
      userType: "patient",
      message: `⏰ You have an appointment tomorrow at ${appt.time}.`,
      type: "appointment_reminder",
      relatedEntity: appt._id,
    });
    // Notify doctor
    await createNotification({
      user: appt.doctor._id,
      userType: "doctor",
      message: `⏰ You have an appointment with ${appt.patient.name} tomorrow at ${appt.time}.`,
      type: "appointment_reminder",
      relatedEntity: appt._id,
    });
  }
};
