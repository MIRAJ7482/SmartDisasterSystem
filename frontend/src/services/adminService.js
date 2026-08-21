import axios from "axios";

const API_URL =
  "https://smart-disaster-backend-skfj.onrender.com/api/admin";

// =====================================
// Get All Users
// Admin Only
// =====================================

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =====================================
// Delete User
// Admin Only
// =====================================

export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// =====================================
// Update User Role
// Admin Only
// =====================================

export const updateUserRole = async (id, role) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/users/${id}/role`,
    {
      role,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};