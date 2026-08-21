import { useState } from "react";
import { deleteReport } from "../services/reportService";
import { useAuth } from "../context/AuthContext";

function ReportCard({ report, onDelete, onEdit }) {
  const { user } = useAuth();

  const [deleting, setDeleting] = useState(false);

  // =========================================
  // CHECK REPORT OWNER
  // =========================================

  const isOwner =
    user &&
    report.reportedBy &&
    (
      report.reportedBy._id === user.id ||
      report.reportedBy === user.id
    );

  const isAdmin = user?.role === "admin";

  const canManage = isAdmin || isOwner;


  // =========================================
  // DELETE REPORT
  // =========================================

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await deleteReport(report._id);

      if (onDelete) {
        onDelete();
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
      setDeleting(false);
    }
  };


  // =========================================
  // EDIT REPORT
  // =========================================

  const handleEdit = () => {
    if (!onEdit) {
      console.error("onEdit function is missing!");
      return;
    }

    onEdit(report);
  };


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

    if (
      disaster.includes("tornado")
    ) {
      return "🌪️";
    }

    if (
      disaster.includes("tsunami")
    ) {
      return "🌊";
    }

    if (
      disaster.includes("drought")
    ) {
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

    if (
      disaster.includes("lightning")
    ) {
      return "⚡";
    }

    if (
      disaster.includes("avalanche")
    ) {
      return "🏔️";
    }

    if (
      disaster.includes("volcano")
    ) {
      return "🌋";
    }

    if (
      disaster.includes("building") ||
      disaster.includes("collapse")
    ) {
      return "🏚️";
    }

    // Default
    return "⚠️";
  };


  // =========================================
  // SEVERITY STYLE
  // =========================================

  const getSeverityClass = () => {

    switch (report.severity) {

      case "High":
        return "severity-high";

      case "Medium":
        return "severity-medium";

      case "Low":
        return "severity-low";

      default:
        return "severity-default";
    }
  };


  // =========================================
  // STATUS STYLE
  // =========================================

  const getStatusClass = () => {

    switch (report.status) {

      case "Resolved":
        return "status-resolved";

      case "Under Review":
        return "status-review";

      case "Pending":
      default:
        return "status-pending";
    }
  };


  // =========================================
  // RENDER
  // =========================================

  return (

    <div className="report-card">

      {/* =====================================
          CARD HEADER
      ===================================== */}

      <div className="report-card-header">

        <div className="report-icon">

          {getDisasterIcon(report.disasterType)}

        </div>


        <div className="report-title">

          <h5>
            {report.disasterType || "Disaster Report"}
          </h5>

          <div className="report-location">

            📍 {report.location || "Unknown Location"}

          </div>

        </div>

      </div>


      {/* =====================================
          CARD BODY
      ===================================== */}

      <div className="report-card-body">

        {/* Severity + Status */}

        <div className="report-badges">

          <span
            className={`report-badge ${getSeverityClass()}`}
          >
            ⚠️ {report.severity || "Unknown"}
          </span>


          <span
            className={`report-badge ${getStatusClass()}`}
          >

            {report.status === "Resolved"
              ? "🟢"
              : report.status === "Under Review"
              ? "🔵"
              : "🟡"
            }{" "}

            {report.status || "Pending"}

          </span>

        </div>


        {/* Description */}

        <div className="report-description">

          <div className="report-label">
            📝 Description
          </div>

          <p>
            {report.description ||
              "No description provided."
            }
          </p>

        </div>


        {/* Reporter */}

        {report.reportedBy && (

          <div className="reporter-info">

            <div className="reporter-avatar">
              👤
            </div>


            <div>

              <div className="report-label">
                Reported By
              </div>

              <strong>
                {report.reportedBy.name ||
                  "Unknown"
                }
              </strong>


              {report.reportedBy.email && (

                <div className="reporter-email">

                  📧 {report.reportedBy.email}

                </div>

              )}

            </div>

          </div>

        )}

      </div>


      {/* =====================================
          CARD FOOTER
      ===================================== */}

      {canManage && (

        <div className="report-card-footer">

          <button
            type="button"
            className="report-edit-btn"
            onClick={handleEdit}
          >
            ✏️ Edit
          </button>


          <button
            type="button"
            className="report-delete-btn"
            onClick={handleDelete}
            disabled={deleting}
          >

            {deleting
              ? "Deleting..."
              : "🗑️ Delete"
            }

          </button>

        </div>

      )}

    </div>

  );
}

export default ReportCard;