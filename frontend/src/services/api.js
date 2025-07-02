import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false,
});

export default api;

export const fetchNotifications = async (token) => {
  const res = await fetch("/api/notifications", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
};

export const markNotificationAsRead = async (id, token) => {
  const res = await fetch(`/api/notifications/${id}/read`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to mark notification as read");
  return res.json();
};
