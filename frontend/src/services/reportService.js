import axios from "axios";

const API_URL = "http://localhost:5000/api/reports";

// ===============================
// Get all reports
// Public
// ===============================
export const getReports = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


// ===============================
// Create new report
// Login required
// ===============================
export const createReport = async (reportData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    reportData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ===============================
// Delete report
// Admin only
// ===============================
export const deleteReport = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ===============================
// Update report
// Owner or Admin
// ===============================
export const updateReport = async (id, reportData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${id}`,
    reportData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ===============================
// Login
// ===============================
export const loginUser = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    userData
  );

  return response.data;
};