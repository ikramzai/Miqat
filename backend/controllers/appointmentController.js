const Appointment = require('../models/Appointment');

// Create appointment
exports.createAppointment = async (req, res) => {
  const { doctor, patient, date, time } = req.body;
  try {
    const appointment = await Appointment.create({ doctor, patient, date, time });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create appointment', error });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('doctor', 'name specialty')
      .populate('patient', 'name email');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor')
      .populate('patient');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointment', error });
  }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update appointment', error });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete appointment', error });
  }
};
