import { useEffect, useState } from "react";

import {
  getReports,
  deleteReport,
  updateReport,
} from "../services/reportService";

import { getAllUsers } from "../services/adminService";

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

  const [editingReport, setEditingReport] =
    useState(null);

  const [deleting, setDeleting] = useState(false);

  const [saving, setSaving] = useState(false);


  // ===================================
  // Load Reports
  // ===================================

  const loadReports = async () => {

    try {

      const data = await getReports();

      setReports(data);

    } catch (error) {

      console.error(
        "Failed to load reports:",
        error.response?.data || error
      );

    }

  };


  // ===================================
  // Load Users
  // ===================================

  const loadUsers = async () => {

    try {

      const data = await getAllUsers();

      setUsers(data);

    } catch (error) {

      console.error(
        "Failed to load users:",
        error.response?.data || error
      );

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

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      setDeleting(true);

      await deleteReport(id);

      alert(
        "Report deleted successfully."
      );

      await loadReports();

    } catch (error) {

      console.error(
        "Delete Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete report."
      );

    } finally {

      setDeleting(false);

    }

  };


  // ===================================
  // Start Editing
  // ===================================

  const handleEdit = (report) => {

    setEditingReport({
      ...report,
    });

    // Scroll to edit section
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // ===================================
  // Update Report
  // ===================================

  const handleUpdate = async (e) => {

    e.preventDefault();

    if (!editingReport) {
      return;
    }

    try {

      setSaving(true);

      await updateReport(
        editingReport._id,
        {
          location:
            editingReport.location,

          disasterType:
            editingReport.disasterType,

          severity:
            editingReport.severity,

          description:
            editingReport.description,
        }
      );

      alert(
        "Report updated successfully."
      );

      setEditingReport(null);

      await loadReports();

    } catch (error) {

      console.error(
        "Update Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update report."
      );

    } finally {

      setSaving(false);

    }

  };


  // ===================================
  // Statistics
  // ===================================

  const totalReports =
    reports.length;

  const totalUsers =
    users.length;


  const highReports =
    reports.filter(
      (report) =>
        report.severity === "High"
    ).length;


  const mediumReports =
    reports.filter(
      (report) =>
        report.severity === "Medium"
    ).length;


  const lowReports =
    reports.filter(
      (report) =>
        report.severity === "Low"
    ).length;


  // ===================================
  // Disaster Type Statistics
  // ===================================

  const disasterStats = {};

  reports.forEach((report) => {

    const type =
      report.disasterType ||
      "Unknown";

    if (disasterStats[type]) {

      disasterStats[type]++;

    } else {

      disasterStats[type] = 1;

    }

  });


  const disasterLabels =
    Object.keys(disasterStats);


  const disasterValues =
    Object.values(disasterStats);


  // ===================================
  // Chart Data
  // ===================================

  // ===================================
// Disaster Type Colors
// ===================================

const disasterColors = {
  Fire: {
    background: "rgba(255, 59, 48, 0.75)",
    border: "rgb(255, 59, 48)",
  },

  Flood: {
    background: "rgba(0, 122, 255, 0.75)",
    border: "rgb(0, 122, 255)",
  },

  Cyclone: {
    background: "rgba(52, 199, 89, 0.75)",
    border: "rgb(52, 199, 89)",
  },

  Earthquake: {
    background: "rgba(175, 82, 222, 0.75)",
    border: "rgb(175, 82, 222)",
  },

  "Road Accident": {
    background: "rgba(255, 149, 0, 0.75)",
    border: "rgb(255, 149, 0)",
  },

  Landslide: {
    background: "rgba(121, 85, 72, 0.75)",
    border: "rgb(121, 85, 72)",
  },

  Storm: {
    background: "rgba(90, 200, 250, 0.75)",
    border: "rgb(90, 200, 250)",
  },

  Tsunami: {
    background: "rgba(0, 180, 216, 0.75)",
    border: "rgb(0, 180, 216)",
  },

  "Volcanic Eruption": {
    background: "rgba(255, 45, 85, 0.75)",
    border: "rgb(255, 45, 85)",
  },

  Drought: {
    background: "rgba(255, 204, 0, 0.75)",
    border: "rgb(255, 204, 0)",
  },
};


// ===================================
// Generate Colors
// ===================================

const backgroundColors = disasterLabels.map(
  (type) =>
    disasterColors[type]?.background ||
    "rgba(108, 117, 125, 0.75)"
);

const borderColors = disasterLabels.map(
  (type) =>
    disasterColors[type]?.border ||
    "rgb(108, 117, 125)"
);


// ===================================
// Disaster Chart Data
// ===================================

const disasterChartData = {
  labels: disasterLabels,

  datasets: [
    {
      label: "Number of Reports",

      data: disasterValues,

      backgroundColor: backgroundColors,

      borderColor: borderColors,

      borderWidth: 2,

      borderRadius: 8,

      hoverBorderWidth: 3,
    },
  ],
};


  // ===================================
  // Chart Options
  // ===================================

  const disasterChartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {
        display: true,
      },

      title: {
        display: true,

        text:
          "Disaster Type Statistics",
      },

    },

  };


  // ===================================
  // UI
  // ===================================

  return (

    <div className="container mt-4">

      {/* =================================
          HEADER
      ================================= */}

      <div className="mb-4">

        <h2>
          🛠️ Admin Dashboard
        </h2>

        <p className="text-muted">
          Manage disaster reports and
          monitor system statistics.
        </p>

      </div>


      {/* =================================
          LOADING
      ================================= */}

      {loading ? (

        <div className="text-center mt-5">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="mt-2">
            Loading dashboard...
          </p>

        </div>

      ) : (

        <>

          {/* =================================
              EDIT REPORT FORM
          ================================= */}

          {editingReport && (

            <div className="card shadow-sm mb-4">

              <div className="card-header bg-warning">

                <h5 className="mb-0">
                  ✏️ Edit Disaster Report
                </h5>

              </div>


              <div className="card-body">

                <form
                  onSubmit={handleUpdate}
                >

                  {/* Location */}

                  <div className="mb-3">

                    <label className="form-label">
                      Location
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={
                        editingReport.location ||
                        ""
                      }
                      onChange={(e) =>
                        setEditingReport({
                          ...editingReport,

                          location:
                            e.target.value,
                        })
                      }
                      required
                    />

                  </div>


                  {/* Disaster Type */}

                  <div className="mb-3">

                    <label className="form-label">
                      Disaster Type
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={
                        editingReport.disasterType ||
                        ""
                      }
                      onChange={(e) =>
                        setEditingReport({
                          ...editingReport,

                          disasterType:
                            e.target.value,
                        })
                      }
                      required
                    />

                  </div>


                  {/* Severity */}

                  <div className="mb-3">

                    <label className="form-label">
                      Severity
                    </label>

                    <select
                      className="form-select"
                      value={
                        editingReport.severity ||
                        "Low"
                      }
                      onChange={(e) =>
                        setEditingReport({
                          ...editingReport,

                          severity:
                            e.target.value,
                        })
                      }
                      required
                    >

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

                  <div className="mb-3">

                    <label className="form-label">
                      Description
                    </label>

                    <textarea
                      className="form-control"
                      rows="4"
                      value={
                        editingReport.description ||
                        ""
                      }
                      onChange={(e) =>
                        setEditingReport({
                          ...editingReport,

                          description:
                            e.target.value,
                        })
                      }
                      required
                    />

                  </div>


                  {/* Buttons */}

                  <button
                    type="submit"
                    className="btn btn-success me-2"
                    disabled={saving}
                  >

                    {saving
                      ? "Saving..."
                      : "💾 Save Changes"}

                  </button>


                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setEditingReport(null)
                    }
                    disabled={saving}
                  >
                    Cancel
                  </button>

                </form>

              </div>

            </div>

          )}


          {/* =================================
              STATISTICS CARDS
          ================================= */}

          <div className="row g-3 mb-4">

            {/* Total Reports */}

            <div className="col-md">

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

            <div className="col-md">

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

            <div className="col-md">

              <div className="card shadow-sm border-0 h-100">

                <div className="card-body text-center">

                  <h6 className="text-muted">
                    High Severity
                  </h6>

                  <h2 className="text-danger">
                    {highReports}
                  </h2>

                </div>

              </div>

            </div>


            {/* Medium */}

            <div className="col-md">

              <div className="card shadow-sm border-0 h-100">

                <div className="card-body text-center">

                  <h6 className="text-muted">
                    Medium Severity
                  </h6>

                  <h2 className="text-warning">
                    {mediumReports}
                  </h2>

                </div>

              </div>

            </div>


            {/* Low */}

            <div className="col-md">

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

            <div className="card-header">

              <h5 className="mb-0">
                📊 Disaster Type Statistics
              </h5>

            </div>


            <div className="card-body">

              {disasterLabels.length === 0 ? (

                <p className="text-muted text-center">
                  No disaster data available.
                </p>

              ) : (

                <div
                  style={{
                    height: "350px",
                  }}
                >

                  <Bar
                    data={disasterChartData}
                    options={
                      disasterChartOptions
                    }
                  />

                </div>

              )}

            </div>

          </div>


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

                        <th>
                          Location
                        </th>

                        <th>
                          Disaster
                        </th>

                        <th>
                          Severity
                        </th>

                        <th>
                          Description
                        </th>

                        <th>
                          Actions
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {reports
                        .slice(0, 10)
                        .map((report) => (

                          <tr
                            key={
                              report._id
                            }
                          >

                            <td>
                              {report.location}
                            </td>


                            <td>
                              {report.disasterType}
                            </td>


                            <td>

                              <span
                                className={`badge ${
                                  report.severity ===
                                  "High"
                                    ? "bg-danger"
                                    : report.severity ===
                                      "Medium"
                                    ? "bg-warning text-dark"
                                    : "bg-success"
                                }`}
                              >

                                {
                                  report.severity
                                }

                              </span>

                            </td>


                            <td>
                              {report.description}
                            </td>


                            <td>

                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() =>
                                  handleEdit(
                                    report
                                  )
                                }
                              >
                                ✏️ Edit
                              </button>


                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  handleDelete(
                                    report._id
                                  )
                                }
                                disabled={deleting}
                              >

                                {deleting
                                  ? "Deleting..."
                                  : "🗑️ Delete"}

                              </button>

                            </td>

                          </tr>

                        ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

        </>

      )}

    </div>

  );

}

export default AdminDashboard;