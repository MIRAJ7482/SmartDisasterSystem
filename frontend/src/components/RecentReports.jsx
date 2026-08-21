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

      alert("Report deleted successfully.");

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
      report.location
    );

    if (location === null) return;

    const description = window.prompt(
      "Description:",
      report.description
    );

    if (description === null) return;

    try {
      await updateReport(report._id, {
        location,
        disasterType: report.disasterType,
        severity: report.severity,
        description,
      });

      alert("Report updated successfully.");

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

      alert("Report status updated successfully.");

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
  // STATUS ICON
  // =========================================

  const getStatusIcon = (status) => {
    switch (status) {
      case "Resolved":
        return "🟢";

      case "Under Review":
        return "🔵";

      case "Pending":
      default:
        return "🟡";
    }
  };


  return (
    <div className="admin-reports-section">


      {/* =====================================
          SECTION HEADER
      ===================================== */}

      <div className="admin-reports-header">

        <div>

          <h4>
            📋 Recent Disaster Reports
          </h4>

          <p>
            Monitor, review and manage disaster reports
          </p>

        </div>


        <div className="admin-report-count">

          <span>
            {reports.length}
          </span>

          <small>
            Reports
          </small>

        </div>

      </div>


      {/* =====================================
          NO REPORTS
      ===================================== */}

      {reports.length === 0 ? (

        <div className="admin-empty-state">

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

      ) : (


        /* =====================================
           REPORT GRID
        ===================================== */

        <div className="admin-report-grid">

          {reports.slice(0, 10).map((report) => (

            <div
              className={`admin-report-card ${getSeverityClass(
                report.severity
              )}`}
              key={report._id}
            >


              {/* =================================
                  CARD TOP
              ================================= */}

              <div className="admin-card-top">


                <div className="admin-disaster-info">

                  <div className="admin-disaster-icon">

                    {getDisasterIcon(
                      report.disasterType
                    )}

                  </div>


                  <div>

                    <h5>
                      {report.disasterType ||
                        "Disaster Report"}
                    </h5>

                    <div className="admin-location">

                      📍{" "}
                      {report.location ||
                        "Unknown Location"}

                    </div>

                  </div>

                </div>


                {/* Severity */}

                <span
                  className={`admin-severity-badge ${getSeverityClass(
                    report.severity
                  )}`}
                >
                  {report.severity || "Unknown"}
                </span>

              </div>


              {/* =================================
                  CARD BODY
              ================================= */}

              <div className="admin-card-body">


                {/* STATUS */}

                <div className="admin-info-block">

                  <label>
                    📌 Status
                  </label>


                  <div className="admin-status-row">

                    <span
                      className={`admin-status-badge ${getStatusClass(
                        report.status
                      )}`}
                    >

                      {getStatusIcon(
                        report.status
                      )}

                      {" "}

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
                        🟡 Pending
                      </option>

                      <option value="Under Review">
                        🔵 Under Review
                      </option>

                      <option value="Resolved">
                        🟢 Resolved
                      </option>

                    </select>

                  </div>

                </div>


                {/* REPORTER */}

                <div className="admin-info-block">

                  <label>
                    👤 Reported By
                  </label>


                  <div className="admin-reporter">

                    <div className="admin-avatar">
                      👤
                    </div>


                    <div>

                      <strong>
                        {report.reportedBy?.name ||
                          "Unknown"}
                      </strong>

                      <small>
                        {report.reportedBy?.email ||
                          "N/A"}
                      </small>

                    </div>

                  </div>

                </div>


                {/* DESCRIPTION */}

                <div className="admin-description">

                  <label>
                    📝 Description
                  </label>

                  <p>
                    {report.description ||
                      "No description provided."}
                  </p>

                </div>

              </div>


              {/* =================================
                  CARD FOOTER
              ================================= */}

              <div className="admin-card-footer">


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

      )}

    </div>
  );
}

export default RecentReports;