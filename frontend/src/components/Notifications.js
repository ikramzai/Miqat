import React, { useEffect, useState, useRef } from "react";
import {
  fetchNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../services/api";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaUserMd,
  FaExclamationCircle,
  FaBell,
} from "react-icons/fa";

const typeIcon = (type) => {
  switch (type) {
    case "appointment_booked":
      return <FaCalendarAlt color="#2563eb" style={{ marginRight: 8 }} />;
    case "appointment_confirmed":
      return <FaCheckCircle color="#38a169" style={{ marginRight: 8 }} />;
    case "appointment_cancelled":
      return <FaExclamationCircle color="#e53e3e" style={{ marginRight: 8 }} />;
    case "availability_changed":
      return <FaUserMd color="#805ad5" style={{ marginRight: 8 }} />;
    case "appointment_reminder":
      return <FaBell color="#f6ad55" style={{ marginRight: 8 }} />;
    default:
      return <FaBell color="#2563eb" style={{ marginRight: 8 }} />;
  }
};

const Notifications = ({ token, onMarkAsRead }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dismissedWelcome, setDismissedWelcome] = useState(false);
  const [autoDismissed, setAutoDismissed] = useState([]);
  const welcomeTimeoutRef = useRef(null);
  const dismissTimeouts = useRef({});

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchNotifications(token);
        setNotifications(data);
      } catch (err) {
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };
    if (token) load();
  }, [token]);

  // Auto-dismiss and mark welcome notification as read
  useEffect(() => {
    if (!loading && notifications.length > 0) {
      const welcome = notifications.find(
        (n) => n.type === "welcome" && !n.read
      );
      if (welcome && !dismissedWelcome) {
        welcomeTimeoutRef.current = setTimeout(async () => {
          await handleMarkAsRead(welcome._id);
          setDismissedWelcome(true);
        }, 4000); // 4 seconds
      }
    }
    return () => {
      if (welcomeTimeoutRef.current) clearTimeout(welcomeTimeoutRef.current);
    };
    // eslint-disable-next-line
  }, [loading, notifications, dismissedWelcome]);

  // Auto-dismiss any notification after it is marked as read
  useEffect(() => {
    notifications.forEach((n) => {
      if (
        n.read &&
        !autoDismissed.includes(n._id) &&
        !dismissTimeouts.current[n._id]
      ) {
        dismissTimeouts.current[n._id] = setTimeout(async () => {
          setAutoDismissed((prev) => [...prev, n._id]);
          delete dismissTimeouts.current[n._id];
          try {
            console.log("Deleting notification", n._id, "with token", token);
            await deleteNotification(n._id, token);
          } catch (err) {
            // Optionally handle error
          }
        }, 3000); // 3 seconds
      }
    });
    return () => {
      Object.values(dismissTimeouts.current).forEach(clearTimeout);
    };
  }, [notifications, autoDismissed]);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id, token);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      if (onMarkAsRead) {
        onMarkAsRead(id);
      }
    } catch (err) {
      setError("Failed to mark as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.read);
    for (const n of unread) {
      await handleMarkAsRead(n._id);
    }
  };

  if (loading)
    return <div style={{ padding: 16 }}>Loading notifications...</div>;
  if (error) return <div style={{ padding: 16 }}>{error}</div>;

  return (
    <div
      className="notifications-list"
      style={{
        maxHeight: 400,
        overflowY: "auto",
        minWidth: 340,
        padding: 0,
        border: "1px solid #e3eafc",
        borderRadius: 14,
        boxShadow: "0 4px 24px rgba(42,125,225,0.10)",
        background: "#fff",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #e3eafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
          Notifications
        </h4>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={handleMarkAllAsRead}
            style={{
              fontSize: 13,
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "4px 12px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Mark all as read
          </button>
        )}
      </div>
      {notifications.length === 0 && (
        <div style={{ padding: 20 }}>No notifications.</div>
      )}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {notifications
          .filter((n) =>
            (n.type === "welcome" && !n.read && dismissedWelcome) ||
            autoDismissed.includes(n._id)
              ? false
              : true
          )
          .map((n) => (
            <li
              key={n._id}
              style={{
                background: n.read ? "#f7fafd" : "#eaf2ff",
                borderRadius: 0,
                borderBottom: "1px solid #f0f4fa",
                padding: "14px 20px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                transition: "background 0.2s",
                cursor: n.read ? "default" : "pointer",
                fontWeight: n.read ? 400 : 600,
                position: "relative",
                gap: 10,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#e0eaff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = n.read
                  ? "#f7fafd"
                  : "#eaf2ff")
              }
            >
              <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                {typeIcon(n.type)}
                <div>
                  <div style={{ fontWeight: n.read ? 400 : 600 }}>
                    {n.message}
                  </div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              {!n.read && (
                <button
                  style={{
                    marginLeft: 12,
                    fontSize: 13,
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "4px 10px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                  onClick={() => handleMarkAsRead(n._id)}
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Notifications;
