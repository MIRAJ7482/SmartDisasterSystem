import { deleteReport } from "../services/reportService";

function ReportCard({ report, onDelete, onEdit }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReport(report._id);

      alert("Report deleted successfully!");

      onDelete();
    } catch (error) {
      console.error(error);
      alert("Failed to delete report.");
    }
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">
          📍 {report.location}
        </h5>

        <p>
          <strong>Disaster:</strong> {report.disasterType}
        </p>

        <p>
          <strong>Severity:</strong> {report.severity}
        </p>

        <p>
          <strong>Description:</strong> {report.description}
        </p>

        <button
          className="btn btn-warning me-2"
          onClick={() => onEdit(report)}
        >
          Edit
        </button>

        <button
          className="btn btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ReportCard;