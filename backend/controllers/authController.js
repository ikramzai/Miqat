const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = null;

      // Load user based on role
      if (decoded.role === 'doctor') {
        user = await Doctor.findById(decoded.id).select('-password');
      } else if (decoded.role === 'patient') {
        user = await Patient.findById(decoded.id).select('-password');
      }

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = user;
      req.user.role = decoded.role;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
