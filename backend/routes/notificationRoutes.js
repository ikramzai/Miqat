const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

// Get all notifications for the logged-in user
router.get("/", protect, getUserNotifications);

// Mark a notification as read
router.put("/:id/read", protect, markNotificationAsRead);

// Delete a notification by ID
router.delete("/:id", protect, deleteNotification);

module.exports = router;
