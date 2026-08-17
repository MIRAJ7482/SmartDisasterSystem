import { useEffect, useState } from "react";
import { getReports } from "../services/reportService";
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


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  // =====================================
  // Load Reports
  // =====================================

  const loadReports = async () => {
    try {
      const data = await getReports();

      setReports(data);

    } catch (error) {
      console.error(
        "Failed to load reports:",
        error
      );
    }
  };

  // =====================================
  // Load Users
  // =====================================

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

  // =====================================
  // Load Dashboard Data
  // =====================================

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

  // =====================================
  // Statistics
  // =====================================

  const totalReports = reports.length;

  const totalUsers = users.length;

  const highReports = reports.filter(
    (report) => report.severity === "High"
  ).length;

  const mediumReports = reports.filter(
    (report) => report.severity === "Medium"
  ).length;

  const lowReports = reports.filter(
    (report) => report.severity === "Low"
  ).length;

  // =====================================
  // UI
  // =====================================

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="mb-4">
        <h2>🛠️ Admin Dashboard</h2>

        <p className="text-muted">
          Manage disaster reports and monitor
          system statistics.
        </p>
      </div>

      {/* Loading */}
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
            <div className="col-md-3">
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
            <div className="col-md-3">
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
            <div className="col-md-3">
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

                  <table className="table table-hover">

                    <thead>

                      <tr>
                        <th>Location</th>
                        <th>Disaster</th>
                        <th>Severity</th>
                        <th>Description</th>
                      </tr>

                    </thead>

                    <tbody>

                      {reports
                        .slice(0, 10)
                        .map((report) => (

                          <tr key={report._id}>

                            <td>
                              {report.location}
                            </td>

                            <td>
                              {report.disasterType}
                            </td>

                            <td>

                              <span
                                className={`badge ${
                                  report.severity === "High"
                                    ? "bg-danger"
                                    : report.severity ===
                                      "Medium"
                                    ? "bg-warning text-dark"
                                    : "bg-success"
                                }`}
                              >
                                {report.severity}
                              </span>

                            </td>

                            <td>
                              {report.description}
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