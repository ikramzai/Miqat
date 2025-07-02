const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getUserNotifications,
  markNotificationAsRead,
} = require("../controllers/notificationController");

// Get all notifications for the logged-in user
router.get("/", protect, getUserNotifications);

// Mark a notification as read
router.put("/:id/read", protect, markNotificationAsRead);

module.exports = router;
