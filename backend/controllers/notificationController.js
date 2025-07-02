const Notification = require("../models/Notification");

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a notification (for internal use)
exports.createNotification = async ({ user, message, type, relatedEntity }) => {
  try {
    const notification = new Notification({
      user,
      message,
      type,
      relatedEntity,
    });
    await notification.save();
    return notification;
  } catch (error) {
    // Optionally log error
    return null;
  }
};
