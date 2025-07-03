import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const Toast = ({ message, type = "info", duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-success" />;
      case "error":
        return <FaExclamationTriangle className="text-danger" />;
      case "warning":
        return <FaExclamationTriangle className="text-warning" />;
      default:
        return <FaInfoCircle className="text-info" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-success bg-opacity-10 border-success";
      case "error":
        return "bg-danger bg-opacity-10 border-danger";
      case "warning":
        return "bg-warning bg-opacity-10 border-warning";
      default:
        return "bg-info bg-opacity-10 border-info";
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`toast show border ${getBgColor()}`}
      style={{ minWidth: "300px" }}
    >
      <div className="toast-header d-flex align-items-center">
        <div className="me-2">{getIcon()}</div>
        <strong className="me-auto text-capitalize">{type}</strong>
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
        />
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default Toast;
