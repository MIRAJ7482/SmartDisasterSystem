import { useState } from "react";

import {
  deleteReport,
  updateReport,
  updateReportStatus,
} from "../services/reportService";

function RecentReports({ reports, onRefresh }) {
  const [deleting, setDeleting] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // =========================================
  // DISASTER ICON
  // =========================================

  const getDisasterIcon = (type) => {
    const disaster = (type || "").toLowerCase().trim();

    if (
      disaster.includes("flood") ||
      disaster.includes("water")
    ) {
      return "🌊";
    }

    if (
      disaster.includes("fire") ||
      disaster.includes("wildfire")
    ) {
      return "🔥";
    }

    if (
      disaster.includes("cyclone") ||
      disaster.includes("hurricane") ||
      disaster.includes("typhoon")
    ) {
      return "🌀";
    }

    if (
      disaster.includes("earthquake") ||
      disaster.includes("quake")
    ) {
      return "🌎";
    }

    if (
      disaster.includes("landslide") ||
      disaster.includes("land slide")
    ) {
      return "⛰️";
    }

    if (
      disaster.includes("storm") ||
      disaster.includes("thunderstorm")
    ) {
      return "⛈️";
    }

    if (disaster.includes("tornado")) {
      return "🌪️";
    }

    if (disaster.includes("tsunami")) {
      return "🌊";
    }

    if (disaster.includes("drought")) {
      return "☀️";
    }

    if (
      disaster.includes("heatwave") ||
      disaster.includes("heat wave")
    ) {
      return "🌡️";
    }

    if (
      disaster.includes("cold") ||
      disaster.includes("cold wave")
    ) {
      return "🥶";
    }

    if (disaster.includes("lightning")) {
      return "⚡";
    }

    if (disaster.includes("avalanche")) {
      return "🏔️";
    }

    if (disaster.includes("volcano")) {
      return "🌋";
    }

    if (
      disaster.includes("building") ||
      disaster.includes("collapse")
    ) {
      return "🏚️";
    }

    return "⚠️";
  };


  // =========================================
  // SEVERITY CLASS
  // =========================================

  const getSeverityClass = (severity) => {
    switch (severity) {
      case "High":
        return "admin-severity-high";

      case "Medium":
        return "admin-severity-medium";

      case "Low":
        return "admin-severity-low";

      default:
        return "admin-severity-default";
    }
  };


  // =========================================
  // STATUS CLASS
  // =========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Resolved":
        return "admin-status-resolved";

      case "Under Review":
        return "admin-status-review";

      case "Pending":
      default:
        return "admin-status-pending";
    }
  };


  // =========================================
  // DELETE REPORT
  // =========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(id);

      await deleteReport(id);

      if (onRefresh) {
        await onRefresh();
      }

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
      setDeleting(null);
    }
  };


  // =========================================
  // EDIT REPORT
  // =========================================

  const handleEdit = async (report) => {
    const location = window.prompt(
      "Location:",
      report.location || ""
    );

    if (location === null) return;

    const description = window.prompt(
      "Description:",
      report.description || ""
    );

    if (description === null) return;

    try {
      await updateReport(report._id, {
        location,
        disasterType: report.disasterType,
        severity: report.severity,
        description,
      });

      if (onRefresh) {
        await onRefresh();
      }

    } catch (error) {
      console.error(
        "Update Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update report."
      );
    }
  };


  // =========================================
  // UPDATE STATUS
  // =========================================

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingStatus(id);

      await updateReportStatus(id, status);

      if (onRefresh) {
        await onRefresh();
      }

    } catch (error) {
      console.error(
        "Status Update Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update report status."
      );

    } finally {
      setUpdatingStatus(null);
    }
  };


  // =========================================
  // NO REPORTS
  // =========================================

  if (!reports || reports.length === 0) {
    return (
      <div className="admin-reports-section">

        <div className="admin-reports-heading">
          <div>
            <h4>📋 Recent Disaster Reports</h4>

            <p>
              View and manage disaster reports
            </p>
          </div>

          <span className="admin-report-count">
            0 Reports
          </span>
        </div>


        <div className="admin-empty-card">

          <div className="admin-empty-icon">
            📭
          </div>

          <h5>
            No Disaster Reports
          </h5>

          <p>
            There are currently no disaster reports.
          </p>

        </div>

      </div>
    );
  }


  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="admin-reports-section">

      {/* =====================================
          SECTION HEADER
      ===================================== */}

      <div className="admin-reports-heading">

        <div>
          <h4>
            📋 Recent Disaster Reports
          </h4>

          <p>
            View and manage disaster reports
          </p>
        </div>

        <span className="admin-report-count">
          {reports.length} Reports
        </span>

      </div>


      {/* =====================================
          REPORT GRID
      ===================================== */}

      <div className="admin-reports-grid">

        {reports.slice(0, 10).map((report) => (

          <div
            className="admin-report-card"
            key={report._id}
          >

            {/* =================================
                HEADER
            ================================= */}

            <div className="admin-report-header">

              <div className="admin-report-main">

                <div className="admin-report-icon">
                  {getDisasterIcon(
                    report.disasterType
                  )}
                </div>

                <div>

                  <h5>
                    {report.disasterType ||
                      "Disaster Report"}
                  </h5>

                  <div className="admin-report-location">
                    📍{" "}
                    {report.location ||
                      "Unknown Location"}
                  </div>

                </div>

              </div>


              <span
                className={`admin-severity ${getSeverityClass(
                  report.severity
                )}`}
              >
                ⚠️ {report.severity || "Unknown"}
              </span>

            </div>


            {/* =================================
                BODY
            ================================= */}

            <div className="admin-report-body">

              {/* STATUS */}

              <div className="admin-info-block">

                <div className="admin-info-label">
                  📌 Status
                </div>

                <div className="admin-status-row">

                  <span
                    className={`admin-status ${getStatusClass(
                      report.status
                    )}`}
                  >
                    {report.status ===
                    "Resolved"
                      ? "🟢"
                      : report.status ===
                        "Under Review"
                      ? "🔵"
                      : "🟡"}{" "}
                    {report.status ||
                      "Pending"}
                  </span>

                  <select
                    className="admin-status-select"
                    value={
                      report.status ||
                      "Pending"
                    }
                    onChange={(e) =>
                      handleStatusChange(
                        report._id,
                        e.target.value
                      )
                    }
                    disabled={
                      updatingStatus ===
                      report._id
                    }
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Under Review">
                      Under Review
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>

                  </select>

                </div>

              </div>


              {/* REPORTER */}

              <div className="admin-info-block">

                <div className="admin-info-label">
                  👤 Reported By
                </div>

                <div className="admin-reporter">

                  <div className="admin-reporter-avatar">
                    👤
                  </div>

                  <div>

                    <strong>
                      {report.reportedBy?.name ||
                        "Unknown"}
                    </strong>

                    <small>
                      {report.reportedBy?.email ||
                        "No email available"}
                    </small>

                  </div>

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="admin-info-block">

                <div className="admin-info-label">
                  📝 Description
                </div>

                <p className="admin-description">
                  {report.description ||
                    "No description provided."}
                </p>

              </div>

            </div>


            {/* =================================
                FOOTER
            ================================= */}

            <div className="admin-report-footer">

              <button
                type="button"
                className="admin-edit-btn"
                onClick={() =>
                  handleEdit(report)
                }
              >
                ✏️ Edit
              </button>


              <button
                type="button"
                className="admin-delete-btn"
                onClick={() =>
                  handleDelete(report._id)
                }
                disabled={
                  deleting === report._id
                }
              >
                {deleting === report._id
                  ? "Deleting..."
                  : "🗑️ Delete"}
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentReports;