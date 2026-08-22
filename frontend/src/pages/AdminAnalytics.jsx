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

  const totalReports = reports.length;

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

  return (
    <div className="container-fluid mt-4">

      {/* ===============================
          Header
      =============================== */}

      <div className="mb-4">
        <h2 className="fw-bold">
          📈 Admin Analytics
        </h2>

        <p className="text-muted">
          Monitor disaster reports, status,
          severity and system trends.
        </p>
      </div>

      {/* ===============================
          Status Overview
      =============================== */}

      <h4 className="mb-3">
        📊 Status Overview
      </h4>

      <div className="row g-3 mb-4">

        {/* Total Reports */}

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 text-center h-100">
            <div className="card-body">
              <div className="display-6 mb-2">
                📋
              </div>

              <h6 className="text-muted">
                Total Reports
              </h6>

              <h2 className="text-primary fw-bold">
                {totalReports}
              </h2>
            </div>
          </div>
        </div>

        {/* Pending */}

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 text-center h-100">
            <div className="card-body">
              <div className="display-6 mb-2">
                🟡
              </div>

              <h6 className="text-muted">
                Pending
              </h6>

              <h2 className="text-warning fw-bold">
                {pendingReports}
              </h2>
            </div>
          </div>
        </div>

        {/* Under Review */}

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 text-center h-100">
            <div className="card-body">
              <div className="display-6 mb-2">
                🔵
              </div>

              <h6 className="text-muted">
                Under Review
              </h6>

              <h2 className="text-info fw-bold">
                {underReviewReports}
              </h2>
            </div>
          </div>
        </div>

        {/* Resolved */}

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card shadow-sm border-0 text-center h-100">
            <div className="card-body">
              <div className="display-6 mb-2">
                🟢
              </div>

              <h6 className="text-muted">
                Resolved
              </h6>

              <h2 className="text-success fw-bold">
                {resolvedReports}
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* ===============================
          Severity Analysis
      =============================== */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-header bg-white">
          <h5 className="mb-0">
            🚨 Severity Analysis
          </h5>
        </div>

        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-4">
              <div className="text-center p-3">
                <div className="display-6">
                  🔴
                </div>

                <h6 className="mt-2">
                  High Severity
                </h6>

                <h3 className="text-danger fw-bold">
                  {highReports}
                </h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center p-3">
                <div className="display-6">
                  🟠
                </div>

                <h6 className="mt-2">
                  Medium Severity
                </h6>

                <h3 className="text-warning fw-bold">
                  {mediumReports}
                </h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center p-3">
                <div className="display-6">
                  🟢
                </div>

                <h6 className="mt-2">
                  Low Severity
                </h6>

                <h3 className="text-success fw-bold">
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

      <div className="card shadow-sm border-0">

        <div className="card-header bg-white">
          <h5 className="mb-0">
            📊 Disaster Report Analytics
          </h5>
        </div>

        <div className="card-body">
          <DisasterChart reports={reports} />
        </div>

      </div>

    </div>
  );
}

export default AdminAnalytics;