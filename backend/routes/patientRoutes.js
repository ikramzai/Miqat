const express = require("express");
const router = express.Router();
const {
  registerPatient,
  loginPatient,
  getPatientProfile,
  updatePatientProfile,
  getAllPatients,
  getPatientById,
  deletePatient,
} = require("../controllers/patientController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", registerPatient);
router.post("/login", loginPatient);
router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.get("/profile/me", protect, getPatientProfile);
router.put(
  "/profile/me",
  protect,
  upload.single("profilePicture"),
  updatePatientProfile
);
router.delete("/profile/me", protect, deletePatient);

module.exports = router;
