const express = require("express");
const router = express.Router();
const {
  registerDoctor,
  loginDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorProfile,
  getDoctorProfile,
  deleteDoctor,
  searchDoctors,
} = require("../controllers/doctorController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public routes
router.post("/register", registerDoctor);
router.post("/login", loginDoctor);
router.get("/", getAllDoctors);
router.get("/search", searchDoctors);
router.get("/:id", getDoctorById);

// Protected routes
router.get("/profile/me", protect, getDoctorProfile);
router.put(
  "/profile/me",
  protect,
  upload.single("profilePicture"),
  updateDoctorProfile
);
router.delete("/profile/me", protect, deleteDoctor);

module.exports = router;
