import { useEffect, useState } from "react";
import { getReports } from "../services/reportService";
import ReportCard from "./ReportCard";

function ReportList({
  refresh,
  onEdit = () => {},
  search = "",
  severityFilter = "All",
}) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, [refresh]);

  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  // =========================
  // SEARCH + SEVERITY FILTER
  // =========================

  const filteredReports = reports.filter((report) => {
    const locationMatch = (report.location || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const severityMatch =
      severityFilter === "All"
        ? true
        : report.severity === severityFilter;

    return locationMatch && severityMatch;
  });

  return (
    <div className="container mt-4">

      {/* Title */}
      <h2 className="mb-4">
        📋 Disaster Reports
      </h2>

      {/* Reports */}
      {filteredReports.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted">
            No reports found.
          </p>
        </div>
      ) : (
        filteredReports.map((report) => (
          <ReportCard
            key={report._id}
            report={report}
            onDelete={fetchReports}
            onEdit={onEdit}
          />
        ))
      )}

    </div>
  );
}

export default ReportList;