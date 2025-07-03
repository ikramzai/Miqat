import React from "react";

const LoadingSpinner = ({
  size = "medium",
  text = "Loading...",
  color = "primary",
}) => {
  const sizeClasses = {
    small: "spinner-border-sm",
    medium: "",
    large: "spinner-border-lg",
  };

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-success",
    danger: "text-danger",
    warning: "text-warning",
    info: "text-info",
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <div
        className={`spinner-border ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <p className="mt-3 text-muted fw-medium">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
