import { useEffect, useState } from "react";

import { getReports } from "../services/reportService";
import DisasterChart from "../components/DisasterChart";

function AdminAnalytics() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Load Reports
  // ===============================

  const loadReports = async () => {
    try {
      setLoading(true);

      const data = await getReports();

      setReports(data);
    } catch (error) {
      console.error(
        "Failed to load reports:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
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
          Loading analytics...
        </p>

      </div>
    );
  }

  // ===============================
  // Status Statistics
  // ===============================

  const pendingReports = reports.filter(
    (report) =>
      !report.status ||
      report.status === "Pending"
  ).length;

  const underReviewReports = reports.filter(
    (report) =>
      report.status === "Under Review"
  ).length;

  const resolvedReports = reports.filter(
    (report) =>
      report.status === "Resolved"
  ).length;


  // ===============================
  // Severity Statistics
  // ===============================

  const highReports = reports.filter(
    (report) =>
      report.severity === "High"
  ).length;

  const mediumReports = reports.filter(
    (report) =>
      report.severity === "Medium"
  ).length;

  const lowReports = reports.filter(
    (report) =>
      report.severity === "Low"
  ).length;


  // ===============================
  // Total Reports
  // ===============================

  const totalReports = reports.length;


  return (
    <div className="container-fluid mt-4">

      {/* ===============================
          Header
      =============================== */}

      <div className="mb-4">

        <h2>
          📈 Admin Analytics
        </h2>

        <p className="text-muted">
          Monitor disaster reports, status,
          severity and system trends.
        </p>

      </div>


      {/* ===============================
          Total Reports
      =============================== */}

      <div className="row g-3 mb-4">

        <div className="col-md-4">

          <div className="card shadow-sm text-center h-100">

            <div className="card-body">

              <h6>
                📋 Total Reports
              </h6>

              <h2 className="text-primary">
                {totalReports}
              </h2>

            </div>

          </div>

        </div>


        <div className="col-md-4">

          <div className="card shadow-sm text-center h-100">

            <div className="card-body">

              <h6>
                🟡 Pending
              </h6>

              <h2 className="text-secondary">
                {pendingReports}
              </h2>

            </div>

          </div>

        </div>


        <div className="col-md-4">

          <div className="card shadow-sm text-center h-100">

            <div className="card-body">

              <h6>
                🟢 Resolved
              </h6>

              <h2 className="text-success">
                {resolvedReports}
              </h2>

            </div>

          </div>

        </div>

      </div>


      {/* ===============================
          Status Statistics
      =============================== */}

      <div className="row g-3 mb-4">

        <div className="col-md-4">

          <div className="card shadow-sm text-center">

            <div className="card-body">

              <h6>
                🟡 Pending Reports
              </h6>

              <h3 className="text-secondary">
                {pendingReports}
              </h3>

            </div>

          </div>

        </div>


        <div className="col-md-4">

          <div className="card shadow-sm text-center">

            <div className="card-body">

              <h6>
                🔵 Under Review
              </h6>

              <h3 className="text-warning">
                {underReviewReports}
              </h3>

            </div>

          </div>

        </div>


        <div className="col-md-4">

          <div className="card shadow-sm text-center">

            <div className="card-body">

              <h6>
                🟢 Resolved Reports
              </h6>

              <h3 className="text-success">
                {resolvedReports}
              </h3>

            </div>

          </div>

        </div>

      </div>


      {/* ===============================
          Severity Statistics
      =============================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-header">

          <h5 className="mb-0">
            🚨 Severity Analysis
          </h5>

        </div>

        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-4">

              <div className="text-center">

                <h6>
                  🔴 High Severity
                </h6>

                <h3 className="text-danger">
                  {highReports}
                </h3>

              </div>

            </div>


            <div className="col-md-4">

              <div className="text-center">

                <h6>
                  🟠 Medium Severity
                </h6>

                <h3 className="text-warning">
                  {mediumReports}
                </h3>

              </div>

            </div>


            <div className="col-md-4">

              <div className="text-center">

                <h6>
                  🟢 Low Severity
                </h6>

                <h3 className="text-success">
                  {lowReports}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ===============================
          Disaster Chart
      =============================== */}

      <div className="card shadow-sm mb-4">

        <div className="card-header">

          <h5 className="mb-0">
            📊 Disaster Report Analytics
          </h5>

        </div>

        <div className="card-body">

          <DisasterChart
            reports={reports}
          />

        </div>

      </div>

    </div>
  );
}

export default AdminAnalytics;