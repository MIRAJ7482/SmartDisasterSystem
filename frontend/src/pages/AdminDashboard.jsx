import { useEffect, useMemo, useState } from "react";

import {
  getReports,
  deleteReport,
  updateReport,
} from "../services/reportService";

import {
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../services/adminService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

// =====================================
// Register Chart.js Components
// =====================================

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// =====================================
// Admin Dashboard
// =====================================

function AdminDashboard() {
  // ===================================
  // States
  // ===================================

  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [deletingReportId, setDeletingReportId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [changingRoleId, setChangingRoleId] = useState(null);

  const [editingReport, setEditingReport] = useState(null);

  // ===================================
  // Load Reports
  // ===================================

  const loadReports = async () => {
    try {
      const response = await getReports();

      // Supports both:
      // getReports() -> array
      // getReports() -> { data: [...] }
      // getReports() -> { reports: [...] }
      const data = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.reports)
        ? response.reports
        : [];

      setReports(data);
    } catch (error) {
      console.error(
        "Failed to load reports:",
        error?.response?.data || error
      );

      setReports([]);
    }
  };

  /*// ===================================
  // Load Users
  // ===================================

  const loadUsers = async () => {
  try {
    const response = await getAllUsers();

    console.log("Users API Response:", response);

    let data = [];

    if (Array.isArray(response)) {
      data = response;
    } else if (Array.isArray(response?.users)) {
      data = response.users;
    } else if (Array.isArray(response?.data)) {
      data = response.data;
    } else if (Array.isArray(response?.data?.users)) {
      data = response.data.users;
    }

    console.log("Users Loaded:", data);

    setUsers(data);
  } catch (error) {
    console.error(
      "Failed to load users:",
      error?.response?.data || error
    );

    setUsers([]);
  }
};*/

const loadUsers = async () => {
  try {
    const response = await getAllUsers();

    console.log("========== USER DEBUG ==========");
    console.log("Full Response:", response);
    console.log("Response Users:", response?.users);
    console.log("Response Data:", response?.data);
    console.log("Data Users:", response?.data?.users);

    let data = [];

    if (Array.isArray(response)) {
      data = response;
    } else if (Array.isArray(response?.users)) {
      data = response.users;
    } else if (Array.isArray(response?.data)) {
      data = response.data;
    } else if (Array.isArray(response?.data?.users)) {
      data = response.data.users;
    }

    console.log("FINAL USERS:", data);
    console.log("TOTAL USERS:", data.length);

    setUsers(data);

  } catch (error) {
    console.error(
      "Failed to load users:",
      error?.response?.data || error
    );

    setUsers([]);
  }
};

  // ===================================
  // Load Dashboard
  // ===================================

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        await Promise.all([
          loadReports(),
          loadUsers(),
        ]);
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // ===================================
  // Delete Report
  // ===================================

  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid report ID.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingReportId(id);

      await deleteReport(id);

      alert("Report deleted successfully.");

      await loadReports();
    } catch (error) {
      console.error(
        "Delete Report Error:",
        error?.response?.data || error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to delete report."
      );
    } finally {
      setDeletingReportId(null);
    }
  };

  // ===================================
  // Edit Report
  // ===================================

  const handleEdit = (report) => {
    if (!report) {
      return;
    }

    setEditingReport({
      ...report,
    });

    // Scroll to edit section
    setTimeout(() => {
      document
        .getElementById("edit-report-section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  // ===================================
  // Cancel Edit
  // ===================================

  const handleCancelEdit = () => {
    if (saving) {
      return;
    }

    setEditingReport(null);
  };

  // ===================================
  // Handle Edit Input
  // ===================================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingReport((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ===================================
  // Save Edited Report
  // ===================================

  const handleSaveEdit = async () => {
    if (!editingReport?._id) {
      alert("Invalid report.");
      return;
    }

    if (!editingReport.location?.trim()) {
      alert("Location is required.");
      return;
    }

    if (!editingReport.disasterType?.trim()) {
      alert("Disaster type is required.");
      return;
    }

    if (!editingReport.severity) {
      alert("Please select severity.");
      return;
    }

    if (!editingReport.description?.trim()) {
      alert("Description is required.");
      return;
    }

    try {
      setSaving(true);

      await updateReport(editingReport._id, {
        location: editingReport.location.trim(),
        disasterType: editingReport.disasterType.trim(),
        severity: editingReport.severity,
        description: editingReport.description.trim(),
      });

      alert("Report updated successfully.");

      setEditingReport(null);

      await loadReports();
    } catch (error) {
      console.error(
        "Update Report Error:",
        error?.response?.data || error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to update report."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===================================
  // Delete User
  // ===================================

  const handleDeleteUser = async (id) => {
    if (!id) {
      alert("Invalid user ID.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingUserId(id);

      await deleteUser(id);

      alert("User deleted successfully.");

      await loadUsers();
    } catch (error) {
      console.error(
        "Delete User Error:",
        error?.response?.data || error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to delete user."
      );
    } finally {
      setDeletingUserId(null);
    }
  };

  // ===================================
  // Change User Role
  // ===================================

  const handleRoleChange = async (id, currentRole) => {
    if (!id) {
      alert("Invalid user ID.");
      return;
    }

    const normalizedRole =
      String(currentRole || "").toLowerCase();

    const newRole =
      normalizedRole === "admin"
        ? "user"
        : "admin";

    const confirmChange = window.confirm(
      `Change user role from "${currentRole}" to "${newRole}"?`
    );

    if (!confirmChange) {
      return;
    }

    try {
      setChangingRoleId(id);

      await updateUserRole(id, newRole);

      alert("User role updated successfully.");

      await loadUsers();
    } catch (error) {
      console.error(
        "Role Update Error:",
        error?.response?.data || error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to update user role."
      );
    } finally {
      setChangingRoleId(null);
    }
  };

  // ===================================
  // Statistics
  // ===================================

  const totalReports = reports.length;
  const totalUsers = users.length;

  const highReports = reports.filter(
    (report) =>
      String(report?.severity || "").toLowerCase() ===
      "high"
  ).length;

  const mediumReports = reports.filter(
    (report) =>
      String(report?.severity || "").toLowerCase() ===
      "medium"
  ).length;

  const lowReports = reports.filter(
    (report) =>
      String(report?.severity || "").toLowerCase() ===
      "low"
  ).length;

  // ===================================
  // Disaster Types
  // ===================================

  const disasterTypes = [
    "Fire",
    "Flood",
    "Cyclone",
    "Earthquake",
    "Accident",
    "Landslide",
    "Drought",
    "Tornado",
    "Storm",
    "Other",
  ];

  // ===================================
  // Disaster Type Counts
  // ===================================

  const disasterTypeCounts = useMemo(() => {
    return disasterTypes.map((type) => {
      return reports.filter((report) => {
        const reportType = String(
          report?.disasterType || ""
        )
          .trim()
          .toLowerCase();

        return reportType === type.toLowerCase();
      }).length;
    });
  }, [reports]);

  // ===================================
  // Chart Data
  // ===================================

  const chartData = useMemo(() => {
    return {
      labels: disasterTypes,

      datasets: [
        {
          label: "Number of Reports",

          data: disasterTypeCounts,

          backgroundColor: [
            "#dc3545",
            "#0d6efd",
            "#6f42c1",
            "#795548",
            "#fd7e14",
            "#198754",
            "#ffc107",
            "#20c997",
            "#0dcaf0",
            "#6c757d",
          ],

          borderColor: [
            "#b02a37",
            "#0a58ca",
            "#59359a",
            "#5d4037",
            "#ca6510",
            "#146c43",
            "#cc9a06",
            "#15967d",
            "#0aa2c0",
            "#565e64",
          ],

          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    };
  }, [disasterTypeCounts]);

  // ===================================
  // Chart Options
  // ===================================

  const chartOptions = useMemo(() => {
    return {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: true,
          position: "top",
        },

        title: {
          display: true,
          text: "Disaster Type Statistics",

          font: {
            size: 18,
          },
        },

        tooltip: {
          enabled: true,
        },
      },

      scales: {
        y: {
          beginAtZero: true,

          ticks: {
            stepSize: 1,

            precision: 0,
          },
        },
      },
    };
  }, []);

  // ===================================
  // Loading Screen
  // ===================================

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="mt-3">
            Loading Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ===================================
  // Dashboard UI
  // ===================================

  return (
    <div className="container mt-4 mb-5">

      {/* =================================
          HEADER
      ================================= */}

      <div className="mb-4">
        <h2>🛠️ Admin Dashboard</h2>

        <p className="text-muted">
          Manage disaster reports, users and
          monitor system statistics.
        </p>
      </div>

      {/* =================================
          STATISTICS CARDS
      ================================= */}

      <div className="row g-3 mb-4">

        {/* Total Reports */}

        <div className="col-md-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h6 className="text-muted">
                Total Reports
              </h6>

              <h2 className="text-primary">
                {totalReports}
              </h2>
            </div>
          </div>
        </div>

        {/* Total Users */}

        <div className="col-md-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h6 className="text-muted">
                Total Users
              </h6>

              <h2 className="text-info">
                {totalUsers}
              </h2>
            </div>
          </div>
        </div>

        {/* High */}

        <div className="col-md-2">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h6 className="text-muted">
                High
              </h6>

              <h2 className="text-danger">
                {highReports}
              </h2>
            </div>
          </div>
        </div>

        {/* Medium */}

        <div className="col-md-2">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h6 className="text-muted">
                Medium
              </h6>

              <h2 className="text-warning">
                {mediumReports}
              </h2>
            </div>
          </div>
        </div>

        {/* Low */}

        <div className="col-md-2">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h6 className="text-muted">
                Low Severity
              </h6>

              <h2 className="text-success">
                {lowReports}
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* =================================
          DISASTER TYPE CHART
      ================================= */}

      <div className="card shadow-sm mb-4">

        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            📊 Disaster Type Statistics
          </h5>
        </div>

        <div
          className="card-body"
          style={{ height: "400px" }}
        >
          <Bar
            data={chartData}
            options={chartOptions}
          />
        </div>

      </div>

      {/* =================================
          EDIT REPORT
      ================================= */}

      {editingReport && (
        <div
          id="edit-report-section"
          className="card shadow-sm mb-4"
        >

          <div className="card-header bg-warning">
            <h5 className="mb-0">
              ✏️ Edit Disaster Report
            </h5>
          </div>

          <div className="card-body">

            <div className="row">

              {/* Location */}

              <div className="col-md-6 mb-3">
                <label
                  htmlFor="edit-location"
                  className="form-label"
                >
                  Location
                </label>

                <input
                  id="edit-location"
                  type="text"
                  className="form-control"
                  name="location"
                  value={
                    editingReport.location || ""
                  }
                  onChange={handleEditChange}
                  disabled={saving}
                />
              </div>

              {/* Disaster Type */}

              <div className="col-md-6 mb-3">
                <label
                  htmlFor="edit-disaster-type"
                  className="form-label"
                >
                  Disaster Type
                </label>

                <input
                  id="edit-disaster-type"
                  type="text"
                  className="form-control"
                  name="disasterType"
                  value={
                    editingReport.disasterType || ""
                  }
                  onChange={handleEditChange}
                  disabled={saving}
                />
              </div>

              {/* Severity */}

              <div className="col-md-6 mb-3">
                <label
                  htmlFor="edit-severity"
                  className="form-label"
                >
                  Severity
                </label>

                <select
                  id="edit-severity"
                  className="form-select"
                  name="severity"
                  value={
                    editingReport.severity || ""
                  }
                  onChange={handleEditChange}
                  disabled={saving}
                >
                  <option value="">
                    Select Severity
                  </option>

                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>
                </select>
              </div>

              {/* Description */}

              <div className="col-md-12 mb-3">
                <label
                  htmlFor="edit-description"
                  className="form-label"
                >
                  Description
                </label>

                <textarea
                  id="edit-description"
                  className="form-control"
                  rows="4"
                  name="description"
                  value={
                    editingReport.description || ""
                  }
                  onChange={handleEditChange}
                  disabled={saving}
                />
              </div>

            </div>

            {/* Buttons */}

            <button
              type="button"
              className="btn btn-success me-2"
              onClick={handleSaveEdit}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "💾 Save Changes"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelEdit}
              disabled={saving}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* =================================
          RECENT REPORTS
      ================================= */}

      <div className="card shadow-sm">

        <div className="card-header">
          <h5 className="mb-0">
            📋 Recent Disaster Reports
          </h5>
        </div>

        <div className="card-body">

          {reports.length === 0 ? (
            <p className="text-muted text-center">
              No disaster reports found.
            </p>
          ) : (
            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Disaster</th>
                    <th>Severity</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {reports
                    .slice(0, 10)
                    .map((report) => {

                      const severity =
                        String(
                          report?.severity || ""
                        ).toLowerCase();

                      return (
                        <tr
                          key={report._id}
                        >

                          <td>
                            {report.location || "-"}
                          </td>

                          <td>
                            {report.disasterType || "-"}
                          </td>

                          <td>

                            <span
                              className={`badge ${
                                severity === "high"
                                  ? "bg-danger"
                                  : severity === "medium"
                                  ? "bg-warning text-dark"
                                  : severity === "low"
                                  ? "bg-success"
                                  : "bg-secondary"
                              }`}
                            >
                              {report.severity || "Unknown"}
                            </span>

                          </td>

                          <td>
                            {report.description || "-"}
                          </td>

                          <td>

                            <button
                              type="button"
                              className="btn btn-sm btn-warning me-2"
                              onClick={() =>
                                handleEdit(report)
                              }
                            >
                              ✏️ Edit
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                handleDelete(
                                  report._id
                                )
                              }
                              disabled={
                                deletingReportId ===
                                report._id
                              }
                            >
                              {deletingReportId ===
                              report._id
                                ? "Deleting..."
                                : "🗑️ Delete"}
                            </button>

                          </td>

                        </tr>
                      );
                    })}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

      {/* =================================
          USER MANAGEMENT
      ================================= */}

      <div className="card shadow-sm mt-4">

        <div className="card-header">
          <h5 className="mb-0">
            👥 User Management
          </h5>
        </div>

        <div className="card-body">

          {users.length === 0 ? (
            <p className="text-muted text-center">
              No users found.
            </p>
          ) : (
            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {users.map((user) => {

                    const role =
                      String(
                        user?.role || "user"
                      ).toLowerCase();

                    return (
                      <tr
                        key={user._id}
                      >

                        <td>
                          {user.name || "-"}
                        </td>

                        <td>
                          {user.email || "-"}
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              role === "admin"
                                ? "bg-danger"
                                : "bg-primary"
                            }`}
                          >
                            {role}
                          </span>

                        </td>

                        <td>

                          <button
                            type="button"
                            className="btn btn-sm btn-warning me-2"
                            onClick={() =>
                              handleRoleChange(
                                user._id,
                                role
                              )
                            }
                            disabled={
                              changingRoleId ===
                              user._id
                            }
                          >
                            {changingRoleId ===
                            user._id
                              ? "Updating..."
                              : "🔄 Change Role"}
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleDeleteUser(
                                user._id
                              )
                            }
                            disabled={
                              deletingUserId ===
                              user._id
                            }
                          >
                            {deletingUserId ===
                            user._id
                              ? "Deleting..."
                              : "🗑️ Delete"}
                          </button>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;