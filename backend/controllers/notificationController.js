const Notification = require("../models/Notification");

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
      userType:
        req.user.role ||
        (req.user.constructor.modelName === "Doctor" ? "doctor" : "patient"),
    }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
    console.error("❌ Error marking notification as read:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a notification (for internal use)
exports.createNotification = async ({
  user,
  userType,
  message,
  type,
  relatedEntity,
}) => {
  try {
    const notification = new Notification({
      user,
      userType,
      message,
      type,
      relatedEntity,
    });
    await notification.save();
    return notification;
  } catch (error) {
    console.error("❌ Error creating notification:", error);
    return null;
  }
};

// Delete a notification by ID
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json({ message: "Notification deleted" });
  } catch (error) {
    console.error("❌ Error deleting notification:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
