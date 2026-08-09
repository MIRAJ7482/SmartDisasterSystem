import { useState } from "react";
import { deleteReport } from "../services/reportService";
import { useAuth } from "../context/AuthContext";

function ReportCard({ report, onDelete, onEdit }) {
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);

  // Check whether current user owns this report
  const isOwner =
    user &&
    report.reportedBy &&
    (
      report.reportedBy._id === user.id ||
      report.reportedBy === user.id
    );

  // Admin can manage every report
  const isAdmin = user?.role === "admin";

  // Owner OR Admin
  const canManage = isAdmin || isOwner;

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

  return (
    <div className="card shadow-sm mb-3">

      <div className="card-body">

        {/* Location */}
        <h5 className="card-title">
          📍 {report.location}
        </h5>

        {/* Disaster */}
        <p>
          <strong>Disaster:</strong>{" "}
          {report.disasterType}
        </p>

        {/* Severity */}
        <p>
          <strong>Severity:</strong>{" "}
          {report.severity}
        </p>

        {/* Description */}
        <p>
          <strong>Description:</strong>{" "}
          {report.description}
        </p>

        {/* Reported By */}
        {report.reportedBy && (
          <p className="text-muted">
            👤 Reported by:{" "}
            {report.reportedBy.name || "Unknown"}
          </p>
        )}

        {/* =========================
            OWNER / ADMIN ACTIONS
        ========================= */}

        {canManage && (
          <div className="mt-3">

            {/* Edit */}
            <button
              className="btn btn-warning me-2"
              onClick={() => onEdit(report)}
            >
              ✏️ Edit
            </button>

            {/* Delete */}
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting
                ? "Deleting..."
                : "🗑️ Delete"}
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default ReportCard;