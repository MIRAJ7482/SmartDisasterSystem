import axios from "axios";

// Production Backend
const API_URL =
  "https://smart-disaster-backend-skfj.onrender.com/api/reports";

const AUTH_URL =
  "https://smart-disaster-backend-skfj.onrender.com/api/auth";

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

  const response = await axios.post(API_URL, reportData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ===============================
// Delete report
// Admin only
// ===============================
export const deleteReport = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

// =====================================
// Update Report Status
// Admin Only
// =====================================
export const updateReportStatus = async (id, status) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${id}/status`,
    {
      status,
    },
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
    `${AUTH_URL}/login`,
    userData
  );

  return response.data;
};