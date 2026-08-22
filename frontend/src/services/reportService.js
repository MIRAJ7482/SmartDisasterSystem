import axios from "axios";

// =====================================
// Production Backend
// =====================================

const API_URL =
  "https://smart-disaster-backend-skfj.onrender.com/api/reports";

const AUTH_URL =
  "https://smart-disaster-backend-skfj.onrender.com/api/auth";


// =====================================
// GET ALL REPORTS
// Public
// =====================================

export const getReports = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};


// =====================================
// CREATE NEW REPORT
// Login Required
// =====================================

export const createReport = async (reportData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    reportData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};


// =====================================
// DELETE REPORT
// Owner OR Admin
// =====================================

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


// =====================================
// UPDATE REPORT
// Owner OR Admin
// =====================================

export const updateReport = async (
  id,
  reportData
) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${id}`,
    reportData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};


// =====================================
// UPDATE REPORT STATUS
// Admin Only
// =====================================

export const updateReportStatus = async (
  id,
  status
) => {
  const token = localStorage.getItem("token");

  // Debug information
  console.log(
    "====================================="
  );

  console.log("Updating Report Status");

  console.log("Report ID:", id);

  console.log("New Status:", status);

  console.log(
    "Token exists:",
    !!token
  );

  console.log(
    "Request URL:",
    `${API_URL}/${id}/status`
  );

  console.log(
    "====================================="
  );


  // Check token
  if (!token) {
    throw new Error(
      "Authentication token not found. Please login again."
    );
  }


  try {

    const response = await axios.put(
      `${API_URL}/${id}/status`,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );


    console.log(
      "Status Update Successful:"
    );

    console.log(
      response.data
    );


    return response.data;

  } catch (error) {

    console.error(
      "====================================="
    );

    console.error(
      "STATUS UPDATE FAILED"
    );

    console.error(
      "HTTP Status:",
      error.response?.status
    );

    console.error(
      "Response Data:",
      error.response?.data
    );

    console.error(
      "Request URL:",
      error.config?.url
    );

    console.error(
      "Request Method:",
      error.config?.method
    );

    console.error(
      "====================================="
    );


    throw error;
  }
};


// =====================================
// LOGIN USER
// =====================================

export const loginUser = async (
  userData
) => {

  const response = await axios.post(
    `${AUTH_URL}/login`,
    userData
  );

  return response.data;
};