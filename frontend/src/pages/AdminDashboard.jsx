import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getReports } from "../services/reportService";
import { getAllUsers } from "../services/adminService";

import DashboardStats from "../components/DashboardStats";

function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Load Reports
  // ===============================

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

  // ===============================
  // Load Users
  // ===============================

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

  // ===============================
  // Load Dashboard
  // ===============================

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

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="container text-center mt-5">

        <div
          className="spinner-border text-primary"
          role="status"
        ></div>

        <p className="mt-2">
          Loading admin dashboard...
        </p>

      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* ===============================
          Header
      =============================== */}

      <div className="mb-4">

        <h2>
          🛠️ Admin Dashboard
        </h2>

        <p className="text-muted">
          Overview of disaster reports, users and
          system status.
        </p>

      </div>


      {/* ===============================
          Statistics
      =============================== */}

      <DashboardStats
        reports={reports}
        users={users}
      />


      {/* ===============================
          Quick Actions
      =============================== */}

      <div className="card shadow-sm mt-4">

        <div className="card-header">

          <h5 className="mb-0">
            ⚡ Quick Actions
          </h5>

        </div>


        <div className="card-body">

          <div className="row g-3">

            {/* Manage Reports */}

            <div className="col-md-4">

              <Link
                to="/admin/reports"
                className="text-decoration-none"
              >

                <div className="card border h-100">

                  <div className="card-body text-center">

                    <div
                      className="display-5 mb-2"
                    >
                      📋
                    </div>

                    <h5>
                      Manage Reports
                    </h5>

                    <p className="text-muted mb-0">
                      View, edit, delete and update
                      disaster reports.
                    </p>

                  </div>

                </div>

              </Link>

            </div>


            {/* Manage Users */}

            <div className="col-md-4">

              <Link
                to="/admin/users"
                className="text-decoration-none"
              >

                <div className="card border h-100">

                  <div className="card-body text-center">

                    <div
                      className="display-5 mb-2"
                    >
                      👥
                    </div>

                    <h5>
                      Manage Users
                    </h5>

                    <p className="text-muted mb-0">
                      View users and manage their
                      roles.
                    </p>

                  </div>

                </div>

              </Link>

            </div>


            {/* Analytics */}

            <div className="col-md-4">

              <Link
                to="/admin/analytics"
                className="text-decoration-none"
              >

                <div className="card border h-100">

                  <div className="card-body text-center">

                    <div
                      className="display-5 mb-2"
                    >
                      📈
                    </div>

                    <h5>
                      Analytics
                    </h5>

                    <p className="text-muted mb-0">
                      Monitor report status and
                      disaster statistics.
                    </p>

                  </div>

                </div>

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;