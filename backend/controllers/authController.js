const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const { createNotification } = require("./notificationController");
const Notification = require("../models/Notification");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = null;

      // Load user based on role
      if (decoded.role === "doctor") {
        user = await Doctor.findById(decoded.id).select("-password");
      } else if (decoded.role === "patient") {
        user = await Patient.findById(decoded.id).select("-password");
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      req.user.role = decoded.role;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  let user = null;
  let Model = null;

  if (role === "doctor") {
    Model = Doctor;
  } else if (role === "patient") {
    Model = Patient;
  } else {
    return res.status(400).json({ message: "Invalid role" });
  }

  user = await Model.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check for first login and create welcome notification
  if (!user.hasLoggedInBefore) {
    await createNotification({
      user: user._id,
      userType: role,
      message: "👋 Welcome to Miqat! We're glad to have you.",
      type: "welcome",
    });
    user.hasLoggedInBefore = true;
    await user.save();
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Return user info (excluding password) and token
  const userObj = user.toObject();
  delete userObj.password;

  res.json({
    user: userObj,
    token,
    role,
  });
};

module.exports = { protect };
