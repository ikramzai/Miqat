import defaultUserImg from "../assets/default-user.png";

const API_BASE_URL = "http://localhost:5000";

/**
 * Get image URL with cache busting to ensure images update when changed
 * @param {string} profilePicture - The profile picture path
 * @returns {string} The image URL with cache busting parameter
 */
export const getImageUrl = (profilePicture) => {
  if (!profilePicture) return defaultUserImg;
  const baseUrl = `${API_BASE_URL}${profilePicture}`;
  // Add timestamp to prevent caching
  return `${baseUrl}?t=${Date.now()}`;
};

/**
 * Handle image load errors by falling back to default image
 * @param {Event} e - The error event
 */
export const handleImageError = (e) => {
  e.target.src = defaultUserImg;
};

/**
 * Get image URL without cache busting (for static images)
 * @param {string} profilePicture - The profile picture path
 * @returns {string} The image URL without cache busting
 */
export const getStaticImageUrl = (profilePicture) => {
  if (!profilePicture) return defaultUserImg;
  return `${API_BASE_URL}${profilePicture}`;
};
