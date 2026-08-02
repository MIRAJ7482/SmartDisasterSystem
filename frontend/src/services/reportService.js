import axios from "axios";

const API_URL = "http://localhost:5000/api/reports";

// Get all reports
export const getReports = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create new report
export const createReport = async (reportData) => {
  const response = await axios.post(API_URL, reportData);
  return response.data;
};

// Delete report 
export const deleteReport = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Update report (Future)
export const updateReport = async (id, reportData) => {
  const response = await axios.put(`${API_URL}/${id}`, reportData);
  return response.data;
};