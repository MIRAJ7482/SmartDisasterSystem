import { useState } from "react";

import {
  deleteReport,
  updateReport,
  updateReportStatus,
} from "../services/reportService";

function RecentReports({ reports, onRefresh }) {
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  // ===============================
  // Delete Report
  // ===============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

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
      setDeleting(false);
    }
  };

  // ===============================
  // Edit Report
  // ===============================

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

  // ===============================
  // Update Report Status
  // Admin Only
  // ===============================

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

  return (
    <div className="card shadow-sm">

      {/* ===============================
          Header
      =============================== */}

      <div className="card-header">

        <h5 className="mb-0">
          📋 Recent Disaster Reports
        </h5>

      </div>


      {/* ===============================
          Body
      =============================== */}

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
                  <th>Status</th>
                  <th>Reporter</th>
                  <th>Email</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>

              </thead>


              <tbody>

                {reports
                  .slice(0, 10)
                  .map((report) => (

                    <tr key={report._id}>

                      {/* Location */}

                      <td>
                        {report.location}
                      </td>


                      {/* Disaster */}

                      <td>
                        {report.disasterType}
                      </td>


                      {/* Severity */}

                      <td>

                        <span
                          className={`badge ${
                            report.severity === "High"
                              ? "bg-danger"
                              : report.severity === "Medium"
                              ? "bg-warning text-dark"
                              : "bg-success"
                          }`}
                        >
                          {report.severity}
                        </span>

                      </td>


                      {/* Status */}

                      <td>

                        <select
                          className="form-select form-select-sm"
                          value={
                            report.status || "Pending"
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

                      </td>


                      {/* Reporter */}

                      <td>

                        <strong>
                          {report.reportedBy?.name ||
                            "Unknown"}
                        </strong>

                      </td>


                      {/* Reporter Email */}

                      <td>
                        {report.reportedBy?.email ||
                          "N/A"}
                      </td>


                      {/* Description */}

                      <td>
                        {report.description}
                      </td>


                      {/* Actions */}

                      <td>

                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() =>
                            handleEdit(report)
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
  );
}

export default RecentReports;